// src/components/SearchBar.jsx
import React from "react"
import { SearchIcon } from "lucide-react"

const SearchBar = ({ value, onChange, placeholder = "Buscar..." }) => {
  return (
    <div className="relative flex items-center">
      <SearchIcon className="absolute left-3 text-gray-400 w-4 h-4" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          pl-8 pr-4 py-2 
          border rounded-full 
          focus:outline-none focus:border-gray-300 
          text-sm w-full
        "
      />
    </div>
  )
}

export default SearchBar
