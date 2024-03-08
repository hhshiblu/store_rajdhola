export const DivisionSelector = ({ divisions, onSelectDivision, address }) => {
  return (
    <div className="flex flex-col w-[98%] md:w-[48%]">
      <label className="block text-sm font-medium text-gray-700 py-">
        My divisions
      </label>
      <select
        onChange={(e) => onSelectDivision(e.target.value)}
        className="border pl-3 py-2 rounded-md items-center cursor-pointer text-[14px]"
      >
        <option value={address?.division ? address?.division : " "}>
          {address?.division ? address?.division : "Select division"}
        </option>
        {divisions.map((division) => (
          <option key={division.value} value={division.name}>
            {division.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export const DistrictSelector = ({ districts, onSelectDistrict, address }) => {
  return (
    <div className="flex flex-col w-[98%] md:w-[48%]">
      <label className=" block text-sm font-medium text-gray-700">
        My district
      </label>
      <select
        onChange={(e) => onSelectDistrict(e.target.value)}
        className="border pl-3  py-2 rounded-md items-center cursor-pointer text-[14px]"
      >
        <option value={address?.district ? address?.district : ""}>
          {address?.district ? address?.district : "Select district"}
        </option>
        {districts &&
          districts.map((district) => (
            <option key={district.name} value={district.name}>
              {district.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export const UpazilaSelector = ({ upazilas, onSelectUpazila, address }) => {
  return (
    <div className="flex flex-col w-[98%] md:w-[48%]">
      <label className="py-1 block text-sm font-medium text-gray-700">
        My upazila
      </label>
      <select
        onChange={(e) => onSelectUpazila(e.target.value)}
        className="border pl-3  py-2 rounded-md items-center cursor-pointer text-[14px]"
      >
        <option
          value={address?.upazila ? address?.upazila : " "}
          className="pb-2"
        >
          {address?.upazila ? address?.upazila : "Select upazila"}
        </option>
        {upazilas.map((upazila) => (
          <option key={upazila} value={upazila} className="py-2 custom-option">
            {upazila}{" "}
          </option>
        ))}
      </select>
    </div>
  );
};
