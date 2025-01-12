import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("groups");

    const body = await request.json();
    const { name, location, room, people } = body;

    // Find the course by location and room (ignoring course name)
    const existingGroup = await db.collection("groups").findOne({
      "locations.location": location,
      "locations.groups.roomNumber": room,
    });

    if (existingGroup) {
      // If the room is already taken, return an error
      return NextResponse.json(
        { error: `Room ${room} in ${location} is already taken.` },
        { status: 400 }
      );
    }

    // Continue with the rest of the logic if no conflict is found
    const locationData = existingGroup ? 
      existingGroup.locations.find((loc) => loc.location === location) : null;
    
    if (locationData) {
      // Check if the room already exists in the location (for a given course)
      const roomTaken = locationData.groups.some(
        (group) => group.roomNumber === room
      );

      if (roomTaken) {
        return NextResponse.json(
          { error: `Room ${room} in ${location} is already taken.` },
          { status: 400 }
        );
      }

      // Add a new group to the location
      locationData.groups.push({
        numPeople: people,
        roomNumber: room,
        location: location,
        status: people >= 5 ? "unavailable" : "available", // Set status based on number of people
      });

      // Update numGroups and numPeople for the location
      locationData.numGroups = locationData.groups.length;
      locationData.numPeople += people;  // Increment total number of people

      const updatedGroup = await db.collection("groups").updateOne(
        { _id: existingGroup._id },
        {
          $set: { "locations.$[loc]": locationData },
        },
        { arrayFilters: [{ "loc.location": location }] }
      );

      return NextResponse.json(updatedGroup, { status: 200 });
    } else {
      // If no existing group, create a new one
      const newGroup = {
        name,
        locations: [
          {
            location,
            roomNumber: room,
            numGroups: 1,
            numPeople: people, // Initialize with the first person
            status: people >= 5 ? "unavailable" : "available", // Set status based on number of people
            groups: [{
              numPeople: people,
              roomNumber: room,
              location: location,
              status: people >= 5 ? "unavailable" : "available", // Set status based on number of people
            }]
          }
        ]
      };

      const result = await db.collection("groups").insertOne(newGroup);
      return NextResponse.json(result, { status: 201 });
    }
  } catch (error) {
    console.error("Error in POST:", error);
    return NextResponse.json(
      { error: "Failed to add or update group" },
      { status: 500 }
    );
  }
}
