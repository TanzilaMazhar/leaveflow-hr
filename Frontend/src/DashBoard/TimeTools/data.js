import { faker } from "@faker-js/faker";

const typeOptions = ["🔴 Sick Leave", "🟢 Holiday Pay", "🔵 Paid Time Off"];

const data = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  profilePic: `https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/${
    faker.helpers.arrayElement(["male", "female"])
  }/512/${faker.number.int({ min: 1, max: 90 })}.jpg`, 
  title: faker.lorem.sentence(3), 
  date: faker.date
    .recent({ days: 365 })
    .toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }), 
  type: faker.helpers.arrayElement(typeOptions),
  employeesEnrolled: faker.number.int({ min: 1, max: 20 }), 
}));

export default data;




// const policyData = [
//     {
//         id: 1,
//         profilePic: "https://i.pravatar.cc/150?img=1",
//         title: "Wellness Leave Requested",
//         date: "21 Sep, 2024",
//         type: "🔴 Sick Leave",
//         employeesEnrolled: "0 Employees Enrolled",
//     },
//     {
//         id: 2,
//         profilePic: "https://i.pravatar.cc/150?img=2",
//         title: "Vacation Wage Benefits",
//         date: "17 Oct, 2024",
//         type: "🟢 Holiday Pay",
//         employeesEnrolled: "0 Employees Enrolled"
//     },
//     {
//         id: 3,
//         profilePic: "https://i.pravatar.cc/150?img=3",
//         title: "Vacation Pay Entitlements",
//         date: "22 Oct, 2024",
//         type: "🔵 Paid Time Off",
//         employeesEnrolled: "0 Employees Enrolled"
//     },
//     {
//         id: 4,
//         profilePic: "https://i.pravatar.cc/150?img=4",
//         title: "Absent For Illness",
//         date: "24 May, 2024",
//         type: "🔴 Sick Leave",
//         employeesEnrolled: "0 Employees Enrolled"
//     },
//     {
//         id: 5,
//         profilePic: "https://i.pravatar.cc/150?img=5",
//         title: "Holiday Remuneration Rights",
//         date: "24 May, 2024",
//         type: "🟢 Holiday Pay",
//         employeesEnrolled: "0 Employees Enrolled"
//     },
//     {
//         id: 6,
//         profilePic: "https://i.pravatar.cc/150?img=6",
//         title: "Time Off Benefits",
//         date: "1 Feb, 2024",
//         type: "🟢 Holiday Pay",
//         employeesEnrolled: "0 Employees Enrolled"
//     },
//     {
//         id: 7,
//         profilePic: "https://i.pravatar.cc/150?img=7",
//         title: "Health Issues Leave",
//         date: "8 Sep, 2024",
//         type: "🔴 Sick Leave",
//         employeesEnrolled: "0 Employees Enrolled"
//     },
//     {
//         id: 8,
//         profilePic: "https://i.pravatar.cc/150?img=8",
//         title: "Paid Time Benefits",
//         date: "1 Feb, 2024",
//         type: "🟢 Holiday Pay",
//         employeesEnrolled: "0 Employees Enrolled"
//     },
//     {
//         id: 9,
//         profilePic: "https://i.pravatar.cc/150?img=9",
//         title: "Holiday Pay Basics",
//         date: "1 Feb, 2024",
//         type: "🔵 Paid Time Off",
//         employeesEnrolled: "0 Employees Enrolled"
//     },
//     {
//         id: 10,
//         profilePic: "https://i.pravatar.cc/150?img=10",
//         title: "Vacation Pay Basics",
//         date: "17 Oct, 2024",
//         type: "🟢 Holiday Pay",
//         employeesEnrolled: "0 Employees Enrolled",
        
//     }
// ];

// export default policyData