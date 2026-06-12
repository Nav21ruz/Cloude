import { PrismaClient, Role, ProjectType, ProjectStatus, TaskStatus, Priority, PaymentType, StageStatus } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import bcrypt from "bcryptjs";
import path from "path";

const dbUrl = "file://" + path.join(process.cwd(), "prisma/dev.db");
const adapter = new PrismaLibSql({ url: dbUrl });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  await prisma.payment.deleteMany();
  await prisma.estimateItem.deleteMany();
  await prisma.estimate.deleteMany();
  await prisma.task.deleteMany();
  await prisma.stage.deleteMany();
  await prisma.projectMember.deleteMany();
  await prisma.project.deleteMany();
  await prisma.client.deleteMany();
  await prisma.user.deleteMany();

  // Users
  const adminPwd = await bcrypt.hash("admin123", 10);
  const managerPwd = await bcrypt.hash("manager123", 10);
  const foremanPwd = await bcrypt.hash("foreman123", 10);
  const workerPwd = await bcrypt.hash("worker123", 10);

  const admin = await prisma.user.create({
    data: { name: "Администратор", email: "admin@komstroy.ru", password: adminPwd, role: Role.ADMIN, phone: "+7 (351) 000-00-00" },
  });
  const manager = await prisma.user.create({
    data: { name: "Иван Петров", email: "manager@komstroy.ru", password: managerPwd, role: Role.MANAGER, phone: "+7 (351) 111-11-11" },
  });
  const foreman = await prisma.user.create({
    data: { name: "Сергей Иванов", email: "foreman@komstroy.ru", password: foremanPwd, role: Role.FOREMAN, phone: "+7 (351) 222-22-22" },
  });
  const worker = await prisma.user.create({
    data: { name: "Алексей Сидоров", email: "worker@komstroy.ru", password: workerPwd, role: Role.WORKER, phone: "+7 (351) 333-33-33" },
  });

  // Clients
  const client1 = await prisma.client.create({
    data: { name: "Алексей Морозов", company: "ООО «Торговый центр Южный»", phone: "+7 (351) 444-44-44", email: "morozov@tc-south.ru", address: "Челябинск, ул. Труда, 156" },
  });
  const client2 = await prisma.client.create({
    data: { name: "Екатерина Волкова", company: "ИП Волкова", phone: "+7 (351) 555-55-55", email: "volkova@mail.ru", address: "Челябинск, пр. Ленина, 42" },
  });
  const client3 = await prisma.client.create({
    data: { name: "Дмитрий Захаров", company: "Медицинский центр «Здоровье»", phone: "+7 (351) 666-66-66", email: "zakharov@health-clinic.ru", address: "Челябинск, ул. Кирова, 100" },
  });

  // Project 1 - Active
  const project1 = await prisma.project.create({
    data: {
      title: "Ремонт офиса ООО «Южный»",
      address: "Челябинск, ул. Труда, 156, оф. 301",
      area: 450,
      type: ProjectType.OFFICE,
      status: ProjectStatus.ACTIVE,
      startDate: new Date("2026-05-01"),
      endDate: new Date("2026-07-31"),
      budget: 3200000,
      description: "Капитальный ремонт офисных помещений на 3 этаже ТЦ Южный",
      clientId: client1.id,
    },
  });

  await prisma.projectMember.createMany({
    data: [
      { projectId: project1.id, userId: manager.id },
      { projectId: project1.id, userId: foreman.id },
      { projectId: project1.id, userId: worker.id },
    ],
  });

  const stages1 = await prisma.stage.createMany({
    data: [
      { projectId: project1.id, name: "Демонтаж", order: 1, status: StageStatus.COMPLETED, startDate: new Date("2026-05-01"), endDate: new Date("2026-05-10") },
      { projectId: project1.id, name: "Электрика и сантехника", order: 2, status: StageStatus.COMPLETED, startDate: new Date("2026-05-11"), endDate: new Date("2026-05-25") },
      { projectId: project1.id, name: "Черновая отделка", order: 3, status: StageStatus.IN_PROGRESS, startDate: new Date("2026-05-26"), endDate: new Date("2026-06-20") },
      { projectId: project1.id, name: "Чистовая отделка", order: 4, status: StageStatus.PENDING, startDate: new Date("2026-06-21"), endDate: new Date("2026-07-20") },
      { projectId: project1.id, name: "Финальная уборка и сдача", order: 5, status: StageStatus.PENDING, startDate: new Date("2026-07-21"), endDate: new Date("2026-07-31") },
    ],
  });

  const stagesList1 = await prisma.stage.findMany({ where: { projectId: project1.id }, orderBy: { order: "asc" } });

  await prisma.task.createMany({
    data: [
      { projectId: project1.id, stageId: stagesList1[2].id, title: "Выравнивание стен шпаклёвкой", status: TaskStatus.IN_PROGRESS, priority: Priority.HIGH, assigneeId: foreman.id, dueDate: new Date("2026-06-15") },
      { projectId: project1.id, stageId: stagesList1[2].id, title: "Стяжка пола в зоне опенспейс", status: TaskStatus.TODO, priority: Priority.HIGH, assigneeId: worker.id, dueDate: new Date("2026-06-18") },
      { projectId: project1.id, stageId: stagesList1[3].id, title: "Поклейка обоев переговорная", status: TaskStatus.TODO, priority: Priority.MEDIUM, assigneeId: worker.id, dueDate: new Date("2026-06-25") },
      { projectId: project1.id, title: "Заказать материалы — ламинат 450м²", status: TaskStatus.DONE, priority: Priority.URGENT, assigneeId: manager.id, dueDate: new Date("2026-06-10") },
    ],
  });

  await prisma.estimate.create({
    data: {
      projectId: project1.id,
      name: "Смета №1 — Ремонт офиса",
      total: 3150000,
      items: {
        create: [
          { name: "Демонтажные работы", unit: "м²", quantity: 450, price: 800, total: 360000 },
          { name: "Штукатурка стен", unit: "м²", quantity: 850, price: 650, total: 552500 },
          { name: "Стяжка пола", unit: "м²", quantity: 450, price: 900, total: 405000 },
          { name: "Электромонтаж", unit: "точка", quantity: 120, price: 2500, total: 300000 },
          { name: "Сантехника", unit: "точка", quantity: 18, price: 8000, total: 144000 },
          { name: "Натяжной потолок", unit: "м²", quantity: 450, price: 1200, total: 540000 },
          { name: "Ламинат Egger 33кл", unit: "м²", quantity: 320, price: 1850, total: 592000 },
          { name: "Покраска стен", unit: "м²", quantity: 600, price: 450, total: 270000 },
        ],
      },
    },
  });

  await prisma.payment.createMany({
    data: [
      { projectId: project1.id, type: PaymentType.INCOME, amount: 1280000, date: new Date("2026-05-01"), description: "Аванс 40%" },
      { projectId: project1.id, type: PaymentType.INCOME, amount: 960000, date: new Date("2026-06-01"), description: "Второй транш — по завершении этапа 2" },
      { projectId: project1.id, type: PaymentType.EXPENSE, amount: 420000, date: new Date("2026-05-05"), description: "Материалы — штукатурка, шпаклёвка" },
      { projectId: project1.id, type: PaymentType.EXPENSE, amount: 180000, date: new Date("2026-05-20"), description: "Электрика — кабели и фурнитура" },
      { projectId: project1.id, type: PaymentType.EXPENSE, amount: 350000, date: new Date("2026-06-03"), description: "Ламинат Egger 320м²" },
    ],
  });

  // Project 2 - Negotiation
  const project2 = await prisma.project.create({
    data: {
      title: "Кафе на пр. Ленина",
      address: "Челябинск, пр. Ленина, 42",
      area: 180,
      type: ProjectType.RESTAURANT,
      status: ProjectStatus.NEGOTIATION,
      budget: 1800000,
      description: "Ремонт помещения под кафе — дизайнерская отделка",
      clientId: client2.id,
    },
  });

  // Project 3 - Completed
  const project3 = await prisma.project.create({
    data: {
      title: "Медцентр «Здоровье» — 2-й этаж",
      address: "Челябинск, ул. Кирова, 100",
      area: 320,
      type: ProjectType.MEDICAL,
      status: ProjectStatus.COMPLETED,
      startDate: new Date("2026-01-15"),
      endDate: new Date("2026-04-30"),
      budget: 4500000,
      description: "Ремонт медицинских кабинетов согласно СанПиН",
      clientId: client3.id,
    },
  });

  await prisma.payment.createMany({
    data: [
      { projectId: project3.id, type: PaymentType.INCOME, amount: 1800000, date: new Date("2026-01-15"), description: "Аванс 40%" },
      { projectId: project3.id, type: PaymentType.INCOME, amount: 1350000, date: new Date("2026-03-01"), description: "Второй транш" },
      { projectId: project3.id, type: PaymentType.INCOME, amount: 1350000, date: new Date("2026-04-30"), description: "Финальный платёж" },
      { projectId: project3.id, type: PaymentType.EXPENSE, amount: 1650000, date: new Date("2026-01-20"), description: "Материалы" },
      { projectId: project3.id, type: PaymentType.EXPENSE, amount: 820000, date: new Date("2026-02-15"), description: "Субподряд — сантехника медицинская" },
    ],
  });

  console.log("✅ Seed complete!");
  console.log("\nДанные для входа:");
  console.log("  Администратор: admin@komstroy.ru / admin123");
  console.log("  Менеджер:      manager@komstroy.ru / manager123");
  console.log("  Прораб:        foreman@komstroy.ru / foreman123");
  console.log("  Рабочий:       worker@komstroy.ru / worker123");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
