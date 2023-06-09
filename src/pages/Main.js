import React, { useContext, useEffect, useState } from 'react';
import './css/main.css';
import { useNavigate } from "react-router-dom";
import { userIn } from '../App';
import { v4 as uuidv4 } from 'uuid'
import { db } from '../firebase/Firebase';
import { collection, query, where, onSnapshot, setDoc, doc } from "firebase/firestore";


const Main = () => {
    const navigate = useNavigate();
    const {user, setUser , setRoom} = useContext(userIn);
    const [rooms, setRooms] = useState([]);
    const [roomId, setRoomId] = useState(null);

    useEffect(() => {
        setUser(uuidv4());
    }, [setUser])
    
    
    //get all rooms
    useEffect(() =>{
        const q = query(collection(db, "games"), where("joiner", "==", null));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const roomList = [];
        querySnapshot.forEach((doc) => {
            roomList.push({id:doc.id ,room: doc.data().room, joiner: doc.data().joiner});
        });

            let r;
            //console.log(rooms);
            if(roomList.length > 0){
                r = Math.floor(Math.random()*roomList.length)
                //console.log(r);
                setRoomId(roomList[r]);
                setRoom(roomList[r].id);
            }
            else{
                setRoomId("pas de room disponible");
            }
       // console.log("Current rooms in CA: ", rooms.join(", "));
            setRooms(roomList);
        })

        return ()=>unsubscribe();
    }, [setRooms, roomId, setRoom]);

    //create a new room
    const createRoom = async ()=>{

        await setDoc(doc(db,"games", user),{
            room : user,
            created: new Date(),
            joiner : null,
            tour: 0,
            cases: 0,
        }).then(()=>navigate('/game'))
        .catch(err=>console.log(err.message));

        console.log(rooms)
    }

    //  join Room 
    const joinRoom = async ()=>{
        await setDoc(doc(db, "games", roomId.id),{
            joiner : user,
        }, {merge : true}).then(()=>navigate('/game'))
        .catch(err=>console.log(err.message));
    }
  
    
  return (
    <div  className='Main'>
        <header>
            <h2 onClick={()=>navigate('/')}>Morpion game</h2>
        </header>
        <main className='main'>
            <button onClick={()=>{
                if(roomId === "pas de room disponible"){
                    createRoom();
                }
                else{
                    joinRoom();
                }
            }}> Play </button>
        </main>
    </div>
  )
}

export default Main