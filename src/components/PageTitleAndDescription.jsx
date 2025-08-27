export function PageTitleAndDescription({ title, description }) {
  return (
    <div className="text-center">
      <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </div>
  );
}
