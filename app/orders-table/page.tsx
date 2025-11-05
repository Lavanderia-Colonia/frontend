import Header from "@/components/Header";
import OrdersTable from "@/components/OrdersTable";

export default function OrdersTablePage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      <main className="mx-auto max-w-7xl p-6">
        <OrdersTable />
      </main>
    </div>
  );
}
