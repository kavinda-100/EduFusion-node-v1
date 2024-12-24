import { faker } from "@faker-js/faker";
import { zodClassSchemaType } from "@shared/zod/class/class";
import { zodUserSchemaType } from "@shared/zod/user/user.zod";
import { SingleAnnouncementType } from "@/types";

export const generateRandomClassData = (): zodClassSchemaType[] => {
  const classData: zodClassSchemaType[] = [];

  Array.from({ length: 20 }, () => {
    const data = {
      class_code: faker.string.alphanumeric(10),
      class_name: `G${faker.number.int({ min: 1, max: 9 })}${faker.string.alpha(
        {
          length: 1,
          casing: "upper",
        },
      )}Class`,
      instructor_id: faker.string.uuid(),
      course_codes: Array.from(
        { length: faker.number.int({ min: 1, max: 5 }) },
        () => ({
          course_code: faker.string.alphanumeric(5),
        }),
      ),
    };

    classData.push(data);
  });
  return classData;
};

type FakeUserSchemaType = {
  count: number;
  role: "admin" | "student" | "teacher";
};

export const generateFakeUsers = ({
  count = 20,
  role,
}: FakeUserSchemaType): zodUserSchemaType[] => {
  const user: zodUserSchemaType[] = [];

  Array.from({ length: count }, () => {
    const data = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password({
        length: 10,
      }),
      gender: faker.helpers.arrayElement(["male", "female"]),
      dateOfBirth: faker.date
        .past({
          years: 30,
          refDate: new Date(),
        })
        .toISOString(),
      role: role,
      isActive: faker.datatype.boolean(),
      profilePicture: faker.image.avatar(),
      phoneNumber: faker.phone.number(),
      address: {
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        country: faker.location.country(),
        zipCode: faker.location.zipCode(),
      },
      isEmailVerified: faker.datatype.boolean(),
    };

    user.push(data);
  });

  return user;
};

type FakeCourseSchemaType = {
  course_code: string;
  course_name: string;
  course_description: string;
  course_thumbnail: string;
};

export const generateFakeCourse = (count: number): FakeCourseSchemaType[] => {
  const course: FakeCourseSchemaType[] = [];

  Array.from({ length: count }, () => {
    const data: FakeCourseSchemaType = {
      course_code: faker.string.alphanumeric(5),
      course_name: faker.lorem.words(3),
      course_description: faker.lorem.paragraph(),
      course_thumbnail: faker.image.urlPlaceholder({
        width: 300,
        height: 300,
      }),
    };

    course.push(data);
  });

  return course;
};

export const generateFakeAnnouncement = (
  count: number,
): SingleAnnouncementType[] => {
  const announcement: SingleAnnouncementType[] = [];

  Array.from({ length: count }, () => {
    const data: SingleAnnouncementType = {
      subject: faker.lorem.words(3),
      replies: Math.floor(Math.random() * 100),
      userName: faker.person.firstName(),
      thumbnail: faker.image.avatar(),
    };

    announcement.push(data);
  });

  return announcement;
};
