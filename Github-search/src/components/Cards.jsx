const Cards = ({ name, avatar, onClick }) => (
  <div
    className="w-1/2 md:w-1/4 p-3 cursor-pointer"
    onClick={onClick}
  >
    <div className="bg-white rounded-lg shadow p-4 text-center hover:shadow-md transition">
      <img
        src={avatar}
        alt={name}
        className="w-16 h-16 rounded-full mx-auto mb-2"
      />
      <p className="text-gray-800 font-semibold">{name}</p>
    </div>
  </div>
);

export default Cards;
