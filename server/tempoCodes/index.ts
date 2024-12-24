// * this of the updateClass function in the server
// //* check of course codes are available in the class.course_table
// let old_course_codes: string[] | undefined = [];
// let new_course_codes: string[] | undefined = [];
// let equal_course_codes: string[] | undefined = [];
//
// if (isClassExists.course_codes != undefined || null) {
//     // check old course codes are equal to new course codes
//     isClassExists.course_codes?.map((course) => {
//         if (data.course_codes?.includes(course)) {
//             equal_course_codes.push(course.course_code);
//         }
//     });
//     // check if there are old course codes
//     isClassExists.course_codes?.map((course) => {
//         if (!data.course_codes?.includes(course)) {
//             old_course_codes.push(course.course_code);
//         }
//     });
// }
// if (data.course_codes != undefined || null) {
//     // check if there are new course codes
//     data.course_codes?.map((course) => {
//         if (!isClassExists.course_codes?.includes(course)) {
//             new_course_codes.push(course.course_code);
//         }
//     });
// }
// // delete old course codes from class.course_table
// if (old_course_codes.length > 0) {
//     let courseCodes = [];
//     for (let i = 0; i < old_course_codes.length; i++) {
//         courseCodes.push({
//             class_code: data.class_code,
//             course_code: old_course_codes[i],
//         });
//     }
//     await ClassCoursesModel.deleteMany(courseCodes);
// }
// // add new course codes to class.course_table
// if (new_course_codes.length > 0) {
//     let courseCodes = [];
//     for (let i = 0; i < new_course_codes.length; i++) {
//         courseCodes.push({
//             class_code: data.class_code,
//             course_code: new_course_codes[i],
//         });
//     }
//     await ClassCoursesModel.insertMany(courseCodes);
// }
