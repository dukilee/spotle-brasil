import React from "react";
import "./Box.css";
import { useState } from "react";
import items from "./assets/dicionario.json"
function fuzzyMatch(input: string, target: string) {
  let i = 0; // posição em input
  let j = 0; // posição em target
  input = input.toLowerCase();
  target = target.toLowerCase();

  while (i < input.length && j < target.length) {
    if (input[i] === target[j]) {
      i++;
    }
    j++;
  }
  return i === input.length;
}

function begginingMatch(input: string, target: string) {
  let i = 0; // posição em input
  let j = 0; // posição em target
  input = input.toLowerCase();
  target = target.toLowerCase();

  while (i < input.length && j < target.length) {
    if (input[i] === target[j]) {
      i++;
    }else{
      break;
    }
    j++;
  }
  return i === input.length;
}

type DropDownProps = {
  updateSelection: (band: InterfaceDictionaryEntry) => void;
};

export interface InterfaceDictionaryEntry {
  name: string;
  year: number;
  members: number;
  genre: string;
  gender: string;
  brazilian: string;
}

const InfoBox: React.FC<DropDownProps> = ({updateSelection}) => {
   const [query, setQuery] = useState("");
  const filteredFuzzy = query
    ? (items as InterfaceDictionaryEntry[]).filter(item => 
         fuzzyMatch(query, item.name)).slice(0, 10)
    : [];
  const filteredBeggining = query
    ? (items as InterfaceDictionaryEntry[]).filter(item => 
         begginingMatch(query, item.name)).slice(0, 10)
    : [];
  const filtered = [...filteredBeggining, ...filteredFuzzy.slice(0, Math.max(0, 10 - filteredBeggining.length))]

  return (
    <div style={{ width: 300, display: "fixed", fontFamily: "sans-serif" }}>
      
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Digite..."
        style={{ width: "100%", padding: "0.5rem" }}
      />

      {filtered.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            border: "1px solid #ccc",
            borderTop: "none"
          }}
        >
          {filtered.map(item => (
            <li
              key={item.name}
              style={{
                padding: "0.5rem",
                borderBottom: "1px solid #ccc",
                cursor: "pointer"
              }}
              onClick={() =>{
                setQuery(item.name);
                updateSelection(item);
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InfoBox;