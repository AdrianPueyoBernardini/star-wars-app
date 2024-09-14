import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


interface Person {
    name: string;
    height: string;
    gender: string;
    mass: string;
    homeworld: string; 
  }
  
  interface Planet {
    name: string;
  }
     const Profile = () =>{

    const { id } = useParams<{ id: string }>(); 
    const [person, setPerson] = useState<Person | null>(null);
    const [planet, setPlanet] = useState<Planet | null>(null);

    useEffect(() => {
        
        const fetchPerson = async () => {
          const response = await fetch(`https://swapi.dev/api/people/${id}`);
          const data = await response.json();
          setPerson(data);

          if (data.homeworld) {
            const planetResponse = await fetch(data.homeworld);
            const planetData = await planetResponse.json();
            setPlanet(planetData);
          }
        };
    
        fetchPerson();
      }, [id]);
        
      if (!person) return <p>Cargando...</p>;

      return (
        <div className="background">
            <div className="ProfileCardDiv">
                <div className="ProfileCard__Area1">
                    <hr />
                    <h1>{person.name}</h1>
                    <hr />
                </div>
                <div className="ProfileCard__Area2">
                    <p>Altura: {person.height}</p>
                    <p>Género: {person.gender}</p>
                    <p>Peso: {person.mass}</p>
                    <p>Planeta: {planet ? planet.name : "Cargando planeta..."}</p>
                    <Link to={"/"} className="button"><Button variant="contained" color="primary" >Volver</Button></Link>
                </div>
            </div>
        </div>
            );
}

export default Profile;


