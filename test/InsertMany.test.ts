import UserModel from "../server/modules/user/user.model";

const Students = [
    {
        firstName: "John",
        lastName: "Doe",
        email: "johndoe@gmail.com",
        password: "123456",
        gender: "male",
        dateOfBirth: "20/03/2002",
        role: "student",
        isActive: true,
        profilePicture: "",
        phoneNumber: "0701234567",
        address: {
            street: "Main St",
            city: "Colombo",
            country: "Sri Lanka",
            zipCode: "10200"
        },
        isEmailVerified: false,
        createdAt: new Date("2024-11-02T08:30:00.000Z"),
        updatedAt: new Date("2024-11-02T08:30:00.000Z"),
        __v: 0
    },
    {
        firstName: "Eva",
        lastName: "Elfie",
        email: "evaelfie@gmail.com",
        password: "123456",
        gender: "female",
        dateOfBirth: "15/12/2001",
        role: "student",
        isActive: true,
        profilePicture: "",
        phoneNumber: "0702346459",
        address: {
            street: "Nattrampotha",
            city: "Kandy",
            country: "Sri Lanka",
            zipCode: "2543"
        },
        isEmailVerified: false,
        createdAt: new Date("2024-11-06T09:44:30.029Z"),
        updatedAt: new Date("2024-11-06T09:44:30.029Z"),
        __v: 0
    },
    {
        firstName: "Michael",
        lastName: "Smith",
        email: "michaelsmith@gmail.com",
        password: "123456",
        gender: "male",
        dateOfBirth: "30/08/2000",
        role: "student",
        isActive: true,
        profilePicture: "",
        phoneNumber: "0703456789",
        address: {
            street: "Palm Grove",
            city: "Galle",
            country: "Sri Lanka",
            zipCode: "80000"
        },
        isEmailVerified: true,
        createdAt: new Date("2024-10-15T12:15:00.000Z"),
        updatedAt: new Date("2024-10-15T12:15:00.000Z"),
        __v: 0
    },
    {
        firstName: "Sophia",
        lastName: "Johnson",
        email: "sophiajohnson@gmail.com",
        password: "123456",
        gender: "female",
        dateOfBirth: "05/06/2001",
        role: "student",
        isActive: true,
        profilePicture: "",
        phoneNumber: "0709876543",
        address: {
            street: "Queens Rd",
            city: "Negombo",
            country: "Sri Lanka",
            zipCode: "11500"
        },
        isEmailVerified: false,
        createdAt: new Date("2024-10-20T16:20:00.000Z"),
        updatedAt: new Date("2024-10-20T16:20:00.000Z"),
        __v: 0
    },
    {
        firstName: "James",
        lastName: "Taylor",
        email: "jamestaylor@gmail.com",
        password: "123456",
        gender: "male",
        dateOfBirth: "18/02/2001",
        role: "student",
        isActive: true,
        profilePicture: "",
        phoneNumber: "0706543210",
        address: {
            street: "Kingston St",
            city: "Colombo",
            country: "Sri Lanka",
            zipCode: "10400"
        },
        isEmailVerified: true,
        createdAt: new Date("2024-09-12T10:45:00.000Z"),
        updatedAt: new Date("2024-09-12T10:45:00.000Z"),
        __v: 0
    },
    {
        firstName: "Olivia",
        lastName: "Brown",
        email: "oliviabrown@gmail.com",
        password: "123456",
        gender: "female",
        dateOfBirth: "22/07/2002",
        role: "student",
        isActive: true,
        profilePicture: "",
        phoneNumber: "0701122334",
        address: {
            street: "Maple Ave",
            city: "Kurunegala",
            country: "Sri Lanka",
            zipCode: "60000"
        },
        isEmailVerified: true,
        createdAt: new Date("2024-09-21T13:30:00.000Z"),
        updatedAt: new Date("2024-09-21T13:30:00.000Z"),
        __v: 0
    },
    {
        firstName: "William",
        lastName: "Williams",
        email: "williamwilliams@gmail.com",
        password: "123456",
        gender: "male",
        dateOfBirth: "15/05/2001",
        role: "student",
        isActive: true,
        profilePicture: "",
        phoneNumber: "0702233445",
        address: {
            street: "Lake Rd",
            city: "Matara",
            country: "Sri Lanka",
            zipCode: "81000"
        },
        isEmailVerified: false,
        createdAt: new Date("2024-08-18T07:50:00.000Z"),
        updatedAt: new Date("2024-08-18T07:50:00.000Z"),
        __v: 0
    },
    {
        firstName: "Emma",
        lastName: "Wilson",
        email: "emmawilson@gmail.com",
        password: "123456",
        gender: "female",
        dateOfBirth: "10/10/2002",
        role: "student",
        isActive: true,
        profilePicture: "",
        phoneNumber: "0705566778",
        address: {
            street: "Elm St",
            city: "Jaffna",
            country: "Sri Lanka",
            zipCode: "40000"
        },
        isEmailVerified: true,
        createdAt: new Date("2024-07-25T15:00:00.000Z"),
        updatedAt: new Date("2024-07-25T15:00:00.000Z"),
        __v: 0
    },
    {
        firstName: "Noah",
        lastName: "Davis",
        email: "noahdavis@gmail.com",
        password: "123456",
        gender: "male",
        dateOfBirth: "12/04/2003",
        role: "student",
        isActive: true,
        profilePicture: "",
        phoneNumber: "0709988776",
        address: {
            street: "Bridge St",
            city: "Batticaloa",
            country: "Sri Lanka",
            zipCode: "30000"
        },
        isEmailVerified: true,
        createdAt: new Date("2024-07-12T11:05:00.000Z"),
        updatedAt: new Date("2024-07-12T11:05:00.000Z"),
        __v: 0
    }
];


const insertMany = async () => {
    try {
        try {
            const result = await UserModel.create(
                {
                    firstName: "Noah",
                    lastName: "Davis",
                    email: "noahdavis@gmail.com",
                    password: "123456",
                    gender: "male",
                    dateOfBirth: "12/04/2003",
                    role: "student",
                    isActive: true,
                    profilePicture: "",
                    phoneNumber: "0709988776",
                    address: {
                        street: "Bridge St",
                        city: "Batticaloa",
                        country: "Sri Lanka",
                        zipCode: "30000"
                    },
                    isEmailVerified: true,
                    createdAt: new Date("2024-07-12T11:05:00.000Z"),
                    updatedAt: new Date("2024-07-12T11:05:00.000Z"),
                    __v: 0
                }
            );
            console.log("Inserted user:", result);
        } catch (error) {
            console.error("Error inserting user:", error);
        }
    }
    catch (e: any) {
        console.log("Error in update many", e.message)
    }
}

insertMany()
