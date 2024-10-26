/*
 *   Copyright (c) 2024 Dilshan Ramesh
 *   All rights reserved.
 */
import User from "./user.model";
import userService from "./user.service";
import UserService from "./user.service";

const seedUsers = async (): Promise<void> => {
  const defaultUsers = [
    {
      firstName: "Edward",
      lastName: "Perera",
      email: "edward.perera@example.com",
      phoneNumber: "+94775670987",
      gender: "M",
      role: "admin",
      NIC: "123456789V",
    },
    {
      firstName: "Alison",
      lastName: "Fernando",
      email: "alison.fernando@example.com",
      phoneNumber: "+94785670988",
      gender: "F",
      role: "user",
      NIC: "234567890V",
    },
    {
      firstName: "Michael",
      lastName: "Jayasing",
      email: "michael.jayasing@example.com",
      phoneNumber: "+94795670989",
      gender: "M",
      role: "admin",
      NIC: "345678901V",
    },
    {
      firstName: "Jessica",
      lastName: "Gunarat",
      email: "jessica.gunarat@example.com",
      phoneNumber: "+94805670980",
      gender: "F",
      role: "user",
      NIC: "456789012V",
    },
    {
      firstName: "Robert",
      lastName: "Kumaras",
      email: "robert.kumaras@example.com",
      phoneNumber: "+94715670981",
      gender: "M",
      role: "user",
      NIC: "567890123V",
    },
    {
      firstName: "Jessica",
      lastName: "Perera",
      email: "jessica.perera@example.com",
      phoneNumber: "+94725670982",
      gender: "F",
      role: "admin",
      NIC: "678901234V",
    },
    {
      firstName: "Daniel",
      lastName: "Silvaa",
      email: "daniel.silva@example.com",
      phoneNumber: "+94735670983",
      gender: "M",
      role: "user",
      NIC: "789012345V",
    },
    {
      firstName: "Laureen",
      lastName: "Desilva",
      email: "laureen.desilva@example.com",
      phoneNumber: "+94745670984",
      gender: "F",
      role: "user",
      NIC: "890123456V",
    },
    {
      firstName: "Jameson",
      lastName: "Niroshan",
      email: "jameson.niroshan@example.com",
      phoneNumber: "+94755670985",
      gender: "M",
      role: "admin",
      NIC: "901234567V",
    },
    {
      firstName: "Emmelyn",
      lastName: "Perera",
      email: "emmelyn.perera@example.com",
      phoneNumber: "+94765670986",
      gender: "F",
      role: "user",
      NIC: "012345678V",
    },
    {
      firstName: "Matthew",
      lastName: "Rathnay",
      email: "matthew.rathnay@example.com",
      phoneNumber: "+94775670987",
      gender: "M",
      role: "user",
      NIC: "123456789X",
    },
    {
      firstName: "Sophie",
      lastName: "Wijesing",
      email: "sophie.wijesing@example.com",
      phoneNumber: "+94785670988",
      gender: "F",
      role: "admin",
      NIC: "234567890x",
    },
    {
      firstName: "William",
      lastName: "Dharmad",
      email: "william.dharmad@example.com",
      phoneNumber: "+94795670989",
      gender: "M",
      role: "user",
      NIC: "345678901V",
    },
    {
      firstName: "Miriam",
      lastName: "Senanay",
      email: "miriam.senanay@example.com",
      phoneNumber: "+94805670980",
      gender: "F",
      role: "user",
      NIC: "456789012v",
    },
    {
      firstName: "Henryk",
      lastName: "Kavinda",
      email: "henry.kavinda@example.com",
      phoneNumber: "+94715670981",
      gender: "M",
      role: "admin",
      NIC: "567890123V",
    },
    {
      firstName: "Olivia",
      lastName: "Gamage",
      email: "olivia.gamage@example.com",
      phoneNumber: "+94725670982",
      gender: "F",
      role: "user",
      NIC: "678901234x",
    },
    {
      firstName: "Ethanj",
      lastName: "Thilakar",
      email: "ethan.thilakar@example.com",
      phoneNumber: "+94735670983",
      gender: "M",
      role: "user",
      NIC: "789012345V",
    },
    {
      firstName: "Isabella",
      lastName: "Wickram",
      email: "isabella.wickram@example.com",
      phoneNumber: "+94745670984",
      gender: "F",
      role: "admin",
      NIC: "890123456V",
    },
    {
      firstName: "Noahaa",
      lastName: "Hewage",
      email: "noah.hewage@example.com",
      phoneNumber: "+94755670985",
      gender: "M",
      role: "user",
      NIC: "901234567V",
    },
    {
      firstName: "Charley",
      lastName: "Desilva",
      email: "charley.desilva@example.com",
      phoneNumber: "+94765670986",
      gender: "F",
      role: "user",
      NIC: "012345678V",
    },
    {
      firstName: "Lucase",
      lastName: "Gunarat",
      email: "lucas.gunarat@example.com",
      phoneNumber: "+94775670987",
      gender: "M",
      role: "admin",
      NIC: "123456789V",
    },
    {
      firstName: "AvaMarie",
      lastName: "Fernando",
      email: "avamarie.fernando@example.com",
      phoneNumber: "+94785670988",
      gender: "F",
      role: "user",
      NIC: "234567890V",
    },
    {
      firstName: "Loganr",
      lastName: "Pererash",
      email: "logan.pererash@example.com",
      phoneNumber: "+94795670989",
      gender: "M",
      role: "admin",
      NIC: "345678901V",
    },
    {
      firstName: "Amelia",
      lastName: "Jayasing",
      email: "amelia.jayasing@example.com",
      phoneNumber: "+94805670980",
      gender: "F",
      role: "user",
      NIC: "456789012V",
    },
    {
      firstName: "Jameson",
      lastName: "Kumaras",
      email: "jameson.kumaras@example.com",
      phoneNumber: "+94715670981",
      gender: "M",
      role: "user",
      NIC: "567890123V",
    },
    {
      firstName: "Evelyn",
      lastName: "Silvas",
      email: "evelyn.silvas@example.com",
      phoneNumber: "+94725670982",
      gender: "F",
      role: "admin",
      NIC: "678901234V",
    },
    {
      firstName: "Jacobh",
      lastName: "Rathnay",
      email: "jacob.rathnay@example.com",
      phoneNumber: "+94735670983",
      gender: "M",
      role: "user",
      NIC: "789012345V",
    },
    {
      firstName: "Sofiah",
      lastName: "Wijesing",
      email: "sofia.wijesing@example.com",
      phoneNumber: "+94745670984",
      gender: "F",
      role: "user",
      NIC: "890123456V",
    },
  ];

  let i = 1;

  for (let defaultUser of defaultUsers) {
    const dbUser = await UserService.findByEmail(defaultUser.email);

    if (dbUser) return;

    console.log(`------Seeding users ${i} ------`);

    const user = new User({ ...defaultUser });

    await UserService.save(user);

    i++;
  }
};

export default { seedUsers };
