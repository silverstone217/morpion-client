import React, {useState, useEffect, useContext } from 'react';
import './css/game.css';
import { useNavigate } from "react-router-dom";
//import axios from 'axios';
import io  from "socket.io-client";
import { userIn } from '../App';
import { db } from '../firebase/Firebase';
import { collection, query, where, onSnapshot, setDoc, doc } from "firebase/firestore";

const socket = io.connect('https://morpion-4ill.onrender.com');


const Game = () => {

    const {user,  room} = useContext(userIn);
    const [choix, setChoix] = useState("X");
    const [tours, setTours] = useState(0);
    const navigate = useNavigate();
   const [rooms, setRooms] = useState([]);
   const [cases, setCases] = useState(0);
   const [ win , setWin] = useState("");

   useEffect(() => {
    if(!room){
      return  navigate('/');
    }
   }, [room]);

  
    // user join room
    useEffect(()=>{
        socket.emit('join', {name:user, room: room})
      }, [user, room]);

    useEffect(() =>{
        if(user === room){

            setChoix("X");
            
        }
        else{
            setChoix("O");
        }
    }, [user, room])

    const [r1, setR1] = useState("");
    const [r2, setR2] = useState("");
    const [r3, setR3] = useState("");
    const [r4, setR4] = useState("");
    const [r5, setR5] = useState("");
    const [r6, setR6] = useState("");
    const [r7, setR7] = useState("");
    const [r8, setR8] = useState("");
    const [r9, setR9] = useState("");

    const [state, setState] = useState([]);
   

    useEffect(() =>{
        const q = query(collection(db, "games"), where("room", "==", room));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const roomList = [];
        querySnapshot.forEach((doc) => {
            roomList.push({id:doc.id , room: doc.data().room, joiner: doc.data().joiner, tour: doc.data().tour, block: doc.data().block, cases: doc.data().cases});
            
        });
            setRooms(roomList[0]);
            setTours(roomList[0].tour);
            setCases(roomList[0].cases);
            //console.log(roomList);
            //setTours(roomList.tour);
            
        })

        return ()=>unsubscribe();
    }, []);

    useEffect(() =>{
        const parentRef = doc(db, 'games', room);

    // Récupération des données de la sous-collection en temps réel.
    const unsubscribe = onSnapshot(collection(parentRef, 'choix'), (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
            setState(data);
            //console.log(roomList);
            //setTours(roomList.tour);
            //setRooms(roomList);
        })

        return ()=>unsubscribe();
    }, []);

    useEffect(()=>{
            // "X player won"
            
                if(r1 === "X" && r2 === "X" && r3 === "X"){
                    setWin("X player won");
                }
                if(r1 === "X" && r4 === "X" && r7 === "X"){
                    setWin("X player won");
                }
                if(r1 === "X" && r5 === "X" && r9 === "X"){
                    setWin("X player won");
                }
                if(r2 === "X" && r5 === "X" && r8 === "X"){
                    setWin("X player won");
                }
                if(r3 === "X" && r5 === "X" && r7 === "X"){
                    setWin("X player won");
                }
                if(r3 === "X" && r6 === "X" && r9 === "X"){
                    setWin("X player won");
                }
                if(r4 === "X" && r5 === "X" && r6 === "X"){
                    setWin("X player won");
                }
                if(r7 === "X" && r8 === "X" && r9 === "X"){
                    setWin("X player won");
                }
    
                //"O player won"
                if(r1 === "O" &&  r2 === "O" &&  r3 === "O"){
                    setWin("O player won");
                }
                if(r1 === "O" &&  r4 === "O" &&  r7 === "O"){
                    setWin("O player won");
                }
                if(r1 === "O" &&  r5 === "O" &&  r9 === "O"){
                    setWin("O player won");
                }
                if(r2 === "O" &&  r5 === "O" &&  r8 === "O"){
                    setWin("O player won");
                }
                if(r3=== "O" &&  r5=== "O" &&  r7 === "O"){
                    setWin("O player won");
                }
                if(r3 === "O" &&  r6 === "O" &&  r9 === "O"){
                    setWin("O player won");
                }
                if(r4 === "O" &&  r5 === "O" &&  r6 === "O"){
                    setWin("O player won");
                }
                if(r7 === "O" && r8 === "O" && r9 === "O"){
                    setWin("O player won");
                }
            
            
        
    }, [r1, r2, r3, r4, r5, r6, r7, r8, r9])

    useEffect(()=>{
        if(cases === 9){
            setWin("draw equality");
        }
    }, [cases])

    useEffect(()=>{
        socket.on('message', ({data})=>{
          //setState(m=> [...m, data]);
         // console.log(data)
          if(data.block === 'r1'){
            //console.log('choix1', data.choix);
            setR1(data.choix);
        }
        if(data.block === 'r2'){
            setR2(data.choix);
            //console.log('choix2', data.choix);
        }
        if(data.block === 'r3'){
            setR3(data.choix);
            //console.log('choix3', data.choix);
        }
        if(data.block === 'r4'){
            setR4(data.choix);
            //console.log('choix4', data.choix);
        }
        if(data.block === 'r5'){
            setR5(data.choix);
            //console.log('choix5', data.choix);
        }
        if(data.block === 'r6'){
            setR6(data.choix);
            //console.log('choix6', data.choix);
        }
        if(data.block === 'r7'){
            setR7(data.choix);
            //console.log('choix7', data.choix);
        }
        if(data.block === 'r8'){
            setR8(data.choix);
            //console.log('choix8', data.choix);
        }
        if(data.block === 'r9'){
            setR9(data.choix);
            //console.log('choix9', data.choix);
        }
          //
        
        })
        
      }, []);

    /* useEffect(()=>{
        
        state.map(x=>{
            if(x.room === room){
                if(x.block === 'r1'){
                    console.log('choix1', x.choix);
                    setR1(x.choix);
                }
                if(x.block === 'r2'){
                    setR2(x.choix);
                    console.log('choix2', x.choix);
                }
                if(x.block === 'r3'){
                    setR3(x.choix);
                    console.log('choix3', x.choix);
                }
                if(x.block === 'r4'){
                    setR4(x.choix);
                    console.log('choix4', x.choix);
                }
                if(x.block === 'r5'){
                    setR5(x.choix);
                    console.log('choix5', x.choix);
                }
                if(x.block === 'r6'){
                    setR6(x.choix);
                    console.log('choix6', x.choix);
                }
                if(x.block === 'r7'){
                    setR7(x.choix);
                    console.log('choix7', x.choix);
                }
                if(x.block === 'r8'){
                    setR8(x.choix);
                    console.log('choix8', x.choix);
                }
                if(x.block === 'r9'){
                    setR9(x.choix);
                    console.log('choix9', x.choix);
                }
                return 1;
            }
            return 0
        })
        
      }, [tours]);*/


    const playGame = async (choix, r, block)=>{
       
        if(cases <= 9){
            if(choix === "X" && tours === 0){
                r(choix);
                await setDoc(doc(db, "games", room),{
                    tour: 1,
                    cases: rooms.cases + 1
                    //block: { block: block, choix: "X" },
                }, {merge : true})/*.then(()=>{
                    socket.emit('play', { block: block, choix: choix,room: room});
                })*/
                .then( async ()=>{
                   await setDoc(doc(db, "games", room, "choix" , block ), {
                        block: block,
                        choix: choix,
                        room: room
                    },  {merge:true})
                    .then(()=>{
                        socket.emit('play', { user, room, block, choix});
                    })
                    .catch(err=>console.log(err.message));
                })
                .catch(err=>console.log(err.message));
                //console.log(r1, r2, r3, r4, r5, r6, r7, r8, r9)
    
                console.log(state)
            }
    
            if(choix === "O" && tours === 1){
                r(choix);
    
                await setDoc(doc(db, "games", room),{
                    tour: 0,
                    cases: rooms.cases + 1
                   // block: { block: block, choix: "X" },
                }, {merge : true})/*.then(()=>{
                    socket.emit('play', { block: block, choix: choix,room: room});
                })*/
                .then( async ()=>{
                   await setDoc(doc(db, "games", room, "choix" , block), {
                        block: block,
                        choix: choix,
                        room: room,
                    }, {merge:true})
                    .then(()=>{
                        socket.emit('play', { user, room, block, choix});
                    })
                    .catch(err=>console.log(err.message));
                })
                .catch(err=>console.log(err.message));
                //console.log(r1, r2, r3, r4, r5, r6, r7, r8, r9)
    
                console.log(state)
            }
        }
        else{
            alert("the game is over!");
        }
        
    }
    //useEffect(()=>console.log(state), [state])
    const replayGame = async()=>{
        setR1("");
        setR2("");
        setR3("");
        setR4("");
        setR5("");
        setR6("");
        setR7("");
        setR8("");
        setR9("");
        setWin("");
        await setDoc(doc(db, "games", room),{
            cases: 0,
            room: room,
            tour: 0,
            //block: { block: block, choix: "X" },
        }).catch(err=>console.log(err) );
    }
   
  return (
    win === ""
    ?
    <div  className='Main'>
    <header>
        <h2 onClick={()=>navigate('/')}>Morpion game</h2>
    </header>
    <h4>C'est le tour: {tours === 0 ? "X" : "O"} </h4>
    <main className='main2'>
        <div className='line'>
            <button disabled={r1 === "" ? false : true} onClick={()=>{if(r1 === ""){playGame(choix, setR1, "r1")}}} className={r1 === ""? 'row' : 'disable'}> {r1} </button>
            <button disabled={r2 === "" ? false : true} onClick={()=>{if(r2 === ""){ playGame(choix, setR2, "r2")}}} className={r2 === ""? 'row' : 'disable'}> {r2} </button >
            <div    disabled={r3 === "" ? false : true} onClick={()=>{if(r3 === ""){ playGame(choix, setR3, "r3")}}} className={r3 === ""? 'row' : 'disable'}> {r3} </div>
        </div>

        <div className='line'>
            <div disabled={r4 === "" ? false : true} onClick={()=>{if(r4 === ""){ playGame(choix, setR4, "r4")}}} className={r4 === ""? 'row' : 'disable'}> {r4} </div>
            <div disabled={r5 === "" ? false : true} onClick={()=>{if(r5 === ""){ playGame(choix, setR5, "r5")}}} className={r5 === ""? 'row' : 'disable'}> {r5}</div>
            <div disabled={r6 === "" ? false : true} onClick={()=>{if(r6 === ""){ playGame(choix, setR6, "r6")}}} className={r6 === ""? 'row' : 'disable'}> {r6} </div>
        </div>

        <div className='line'>
            <div disabled={r7 === "" ? false : true} onClick={()=>{if(r7 === ""){ playGame(choix, setR7, "r7")}}} className={r7 === ""? 'row' : 'disable'}> {r7} </div>
            <div disabled={r8 === "" ? false : true} onClick={()=>{if(r8 === ""){ playGame(choix, setR8, "r8")}}} className={r8 === ""? 'row' : 'disable'}> {r8} </div>
            <div disabled={r9 === "" ? false : true} onClick={()=>{if(r9 === ""){ playGame(choix, setR9, "r9")}}} className={r9 === ""? 'row' : 'disable'}> {r9} </div>
        </div>
    </main>
    <footer>
        <div className='firstDiv'>
            <div className='room'>room: {room}</div>
            <div className='you'>You: {choix}</div>
        </div>
        <div className='btnleave' onClick={()=>navigate('/')}>Leave the game</div>
    </footer>
</div>
    :
    <WinMacth props={win} you={choix} replay={replayGame}/>
  )
}

const WinMacth = ({props, you, replay}) => {

    const navigate = useNavigate();

    return(
        <div className='win'>
            <header>
                <h2 onClick={()=>navigate('/')}>Morpion game</h2>
            </header>
            <h3 className='winh3'>{props}</h3>
            <h5>You:{you}</h5>
            <div className='btnwin'>
                <div className='btnwin1' onClick={()=>navigate('/')}>Menu</div>
                <div className='btnwin2' onClick={()=>replay()}>Rejouer</div>
            </div>
        </div>
    )
}

export default Game