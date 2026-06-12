import { prisma } from "@/lib/db";
import Link from "next/link";
import { Plus, Phone, Mail, Building2, ChevronRight } from "lucide-react";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    include: { _count: { select: { projects: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Клиенты</h1>
          <p className="text-slate-500 text-sm mt-1">{clients.length} заказчиков</p>
        </div>
        <Link
          href="/crm/clients/new"
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" />
          Новый клиент
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100">
        {clients.length === 0 ? (
          <div className="p-12 text-center">
            <Building2 className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <p className="text-slate-400">Нет клиентов. Добавьте первого.</p>
          </div>
        ) : (
          clients.map((client) => (
            <Link
              key={client.id}
              href={`/clients/${client.id}`}
              className="flex items-center justify-between p-5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-orange-600 font-bold text-sm">
                    {client.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{client.name}</div>
                  {client.company && (
                    <div className="text-sm text-slate-500">{client.company}</div>
                  )}
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-slate-400 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {client.phone}
                    </span>
                    {client.email && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {client.email}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-500">
                  {client._count.projects} объект{client._count.projects === 1 ? "" : client._count.projects < 5 ? "а" : "ов"}
                </span>
                <ChevronRight className="w-4 h-4 text-slate-300" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
