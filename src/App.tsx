import { useState} from "react";
import BoxGroup from "./BoxGroup.tsx";
import DropDown from "./DropDown.tsx";
import { InterfaceDictionaryEntry } from "./DropDown.tsx";
import items from "./assets/dicionario.json";

function getDailyItem(): InterfaceDictionaryEntry {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

  // Simple pseudo-random generator based on date seed
  const random = Math.sin(seed) * 10000;
  const index = Math.floor((random - Math.floor(random)) * items.length);

  return items[index];
}

const todayItem = getDailyItem();

export default function AutoComplete() {
  const [boxGroup, setBoxGroup] = useState<JSX.Element[]>([]);
  const [searches, setSearches] = useState(0);
  const limit = 10;

  const bandSelected = function(band: InterfaceDictionaryEntry){
    setSearches(searches + 1);


    //year
    let yearString = band.year.toString();
    if(band.year < todayItem.year) yearString += " ^";
    if(band.year > todayItem.year) yearString += " v";
    const yearStatus = band.year === todayItem.year ? "success" :
        Math.abs(band.year - todayItem.year) < 5 ? "warning" : "default";

    //members
    let membersString = band.members.toString();
    if(band.members < todayItem.members) membersString += " ^";
    if(band.members > todayItem.members) membersString += " v";
    const membersStatus = band.members === todayItem.members ? "success" :
        Math.abs(band.members - todayItem.members) < 5 ? "warning" : "default";

    const newBoxGroup = <BoxGroup
      name={band.name}
      year={yearString}
      members={membersString}
      genre={band.genre}
      gender={band.gender}
      brazilian={band.brazilian === "s" ? "Brasil" : "Internacional"}

      statusName= {band.name === todayItem.name ? "success": "default"}
      statusYear= {yearStatus}
      statusMembers={membersStatus}
      statusGenre={band.genre === todayItem.genre ? "success": "default"}
      statusGender={band.gender === todayItem.gender ? "success": "default"}
      statusBrazilian={band.brazilian === todayItem.brazilian ? "success": "default"}
    />; 

    
    if(searches >= limit -1 && band.name !== todayItem.name){
      const correctBoxGroup = <BoxGroup
        name={todayItem.name}
        year={todayItem.year.toString()}
        members={todayItem.members.toString()}
        genre={todayItem.genre}
        gender={todayItem.gender}
        brazilian={todayItem.brazilian === "s" ? "Brasil" : "Internacional"} 
        statusName= "error"
        statusYear= "error"
        statusMembers= "error"
        statusGenre= "error"
        statusGender= "error"
        statusBrazilian="error"
      />;
      setBoxGroup([ correctBoxGroup, newBoxGroup, ...boxGroup]);
    }else{
      setBoxGroup([ newBoxGroup, ...boxGroup]);
    }

  }

  return (
    <div>
      <div>
        Ja fez {searches}/{limit} buscas.
      </div>
      <div>
        <DropDown  updateSelection={bandSelected} />
      </div>
      <div>
        {boxGroup}
      </div>
    </div>
  )
}