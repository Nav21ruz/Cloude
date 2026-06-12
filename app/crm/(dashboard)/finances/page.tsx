import { prisma } from "@/lib/db";
import { formatCurrency, formatDate } from "@/lib/utils";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export default async function FinancesPage() {
  const [payments, projects] = await Promise.all([
    prisma.payment.findMany({
      include: { project: true },
      orderBy: { date: "desc" },
    }),
    prisma.project.findMany({
      include: { estimates: true, payments: true },
      where: { status: { not: "CANCELLED" } },
    }),
  ]);

  const totalIncome = payments.filter((p) => p.type === "INCOME").reduce((s, p) => s + p.amount, 0);
  const totalExpense = payments.filter((p) => p.type === "EXPENSE").reduce((s, p) => s + p.amount, 0);
  const profit = totalIncome - totalExpense;

  const projectFinances = projects.map((project) => {
    const income = project.payments.filter((p) => p.type === "INCOME").reduce((s, p) => s + p.amount, 0);
    const expense = project.payments.filter((p) => p.type === "EXPENSE").reduce((s, p) => s + p.amount, 0);
    const estimate = project.estimates.reduce((s, e) => s + e.total, 0);
    return { project, income, expense, estimate, balance: income - expense };
  }).filter((pf) => pf.income > 0 || pf.expense > 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Финансы</h1>
        <p className="text-slate-500 text-sm mt-1">Общий финансовый обзор</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-sm text-slate-500">Поступления</span>
          </div>
          <div className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <span className="text-sm text-slate-500">Расходы</span>
          </div>
          <div className="text-2xl font-bold text-red-500">{formatCurrency(totalExpense)}</div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${profit >= 0 ? "bg-orange-100" : "bg-red-100"}`}>
              <DollarSign className={`w-5 h-5 ${profit >= 0 ? "text-orange-600" : "text-red-500"}`} />
            </div>
            <span className="text-sm text-slate-500">Прибыль</span>
          </div>
          <div className={`text-2xl font-bold ${profit >= 0 ? "text-orange-600" : "text-red-500"}`}>{formatCurrency(profit)}</div>
        </div>
      </div>

      {/* By Project */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">По объектам</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-slate-100">
                <th className="text-left pb-3 font-medium">Объект</th>
                <th className="text-right pb-3 font-medium">По смете</th>
                <th className="text-right pb-3 font-medium">Поступило</th>
                <th className="text-right pb-3 font-medium">Расходы</th>
                <th className="text-right pb-3 font-medium">Баланс</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {projectFinances.map(({ project, income, expense, estimate, balance }) => (
                <tr key={project.id}>
                  <td className="py-3 font-medium text-slate-900">{project.title}</td>
                  <td className="py-3 text-right text-slate-500">{estimate > 0 ? formatCurrency(estimate) : "—"}</td>
                  <td className="py-3 text-right text-green-600 font-medium">+{formatCurrency(income)}</td>
                  <td className="py-3 text-right text-red-500 font-medium">-{formatCurrency(expense)}</td>
                  <td className={`py-3 text-right font-bold ${balance >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {formatCurrency(balance)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {projectFinances.length === 0 && (
            <p className="text-slate-400 text-sm py-4 text-center">Нет финансовых данных</p>
          )}
        </div>
      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Последние операции</h2>
        <div className="space-y-1">
          {payments.slice(0, 20).map((payment) => (
            <div key={payment.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50">
              <div>
                <div className="text-sm font-medium text-slate-900">{payment.description ?? "Платёж"}</div>
                <div className="text-xs text-slate-400">{payment.project.title} · {formatDate(payment.date)}</div>
              </div>
              <span className={`font-semibold text-sm ${payment.type === "INCOME" ? "text-green-600" : "text-red-500"}`}>
                {payment.type === "INCOME" ? "+" : "-"}{formatCurrency(payment.amount)}
              </span>
            </div>
          ))}
          {payments.length === 0 && (
            <p className="text-slate-400 text-sm text-center py-4">Нет операций</p>
          )}
        </div>
      </div>
    </div>
  );
}
