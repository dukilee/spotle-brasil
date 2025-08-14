import Box from "./Box";

type BoxGroupProps = {
    name: string;
    year: string;
    members: string;
    genre: string;
    gender: string;
    brazilian: string;

    statusName: "default" | "success" | "warning" | "error";
    statusYear: "default" | "success" | "warning" | "error";
    statusMembers: "default" | "success" | "warning" | "error";
    statusGenre: "default" | "success" | "warning" | "error";
    statusGender: "default" | "success" | "warning" | "error";
    statusBrazilian: "default" | "success" | "warning" | "error";

};

const BoxGroup: React.FC<BoxGroupProps> = ({name, year, members, genre, gender, brazilian, statusName, statusYear, statusMembers, statusGenre, statusGender, statusBrazilian}) => {

  return (
    <div  style={{
          display: "flex",         // side by side
          gap: "8px",               // space between items
          marginTop: "16px",
          flexWrap: "wrap"          // allows wrapping to next line if needed
        }}>
        <Box title="Ano" number={name} status={statusName} />
        <Box title="Ano" number={year} status={statusYear} />
        <Box title="Ano" number={members} status={statusMembers} />
        <Box title="Ano" number={genre} status={statusGenre} />
        <Box title="Ano" number={gender} status={statusGender} />
        <Box title="Ano" number={brazilian} status={statusBrazilian} />
    </div>
  );
};

export default BoxGroup;