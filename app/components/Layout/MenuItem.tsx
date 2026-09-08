interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}

function MenuItem({ icon, label, active = false }: MenuItemProps) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors font-medium ${
        active
          ? "bg-white text-indigo-600"
          : "text-indigo-200 hover:bg-indigo-700 hover:text-white"
      }`}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </button>
  );
}

export default MenuItem;
