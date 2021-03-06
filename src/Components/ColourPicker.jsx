import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./ColourPicker.css";
import { HexColorPicker } from "react-colorful";
import { useContext } from "react";


export const ColourContext = React.createContext()

export function FF(...props) {
    const col_det = useContext(ColourContext)
   
    return (
        <div>
            {(props[0].namee === "wall_7"
                || props[0].namee === "wall_6" || props[0].namee === "wall_5"
                || props[0].namee === "wall_4" || props[0].namee === "wall_3"
                || props[0].namee === "wall_2" || props[0].namee === "wall_1"
                || props[0].namee === "wall_0") &&
                <HexColorPicker
                    style={{
                        position: 'absolute',
                        height: '15vh',
                        width: '15vh',
                        top: '80vh',
                        left: '50vw',
                        transform: 'translateX(-50%)'
                    }}
                    color={
                        props[0].col
                        // col_det.wall
                        // tar === "wall_4" ? "red" : "blue"
                    }
                    onChange={(color) => {
                        if (props[0].namee === "wall_7"
                            || props[0].namee === "wall_7" || props[0].namee === "wall_5"
                            || props[0].namee === "wall_4" || props[0].namee === "wall_3"
                            || props[0].namee === "wall_2" || props[0].namee === "wall_1"
                            || props[0].namee === "wall_0") { col_det.wall = color }
                    }}
                />}
            {!(props[0].namee === "wall_7"
                || props[0].namee === "wall_6" || props[0].namee === "wall_5"
                || props[0].namee === "wall_4" || props[0].namee === "wall_3"
                || props[0].namee === "wall_2" || props[0].namee === "wall_1"
                || props[0].namee === "wall_0") &&
                <div
                    style={{
                        position: 'absolute',
                        top: '80vh',
                        left: '50vw',
                        transform: 'translateX(-50%)',
                        // backgroundColor: "rgba(86, 44, 184, 0.908)",
                        borderRadius: "5px",
                        padding: "10px 30px",
                        border: "3px solid "
                    }}>
                    <h3>
                        Please select wall for colour customization options
                    </h3>
                </div>}
        </div >
    );
}

const ColourPicker = () => {
    const mountRef = useRef(null);
    const [tar, setTar] = useState("None");
    // const [col, setCol] = useState("#039f4e");

    var room;
    // var col1;

    const [colstate, setColstate] = useState({
        current: null,
        ceil: "#024",
        wall: "",
    });

    useEffect(() => {

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        var renderer = new THREE.WebGLRenderer();

        // -----------------------------
        renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
        mountRef.current.appendChild(renderer.domElement);
        const loader = new GLTFLoader();
        const light = new THREE.AmbientLight(); // soft white light
        scene.add(light);

        const light1 = new THREE.PointLight(0xffffff, 1.5, 10, 2);
       

        loader.load(
            "room_camera_geometry.glb",
            function (gltf) {
                room = gltf.scene;

                gltf.scene.rotation.set(0, 3.14159265 / 2, 0);
                gltf.scene.position.set(4.3, 1.4, 1);
                gltf.scene.scale.set(1, 1, 1);
                scene.add(gltf.scene);

                light1.position.copy(gltf.scene.children[8].position);
                light1.translateY(-2);
                console.log("room: ", room);
            },
            undefined,
            function (error) {
                console.error(error);
            }
        );
        scene.add(light1);
       

        scene.background = new THREE.Color(0xffeeee);

        const controls = new OrbitControls(camera, renderer.domElement);

        camera.position.set(-0.2, 0.5, 6);
        controls.update();

        let num = 0;
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();

        function onPointerMove(event) {
            let x = (event.clientX / window.innerWidth) * 2 - 1;
            let y = -1 * (event.clientY / window.innerHeight) * 2 + 1;
            pointer.x = x / 0.5;
            pointer.y = y / 0.5;
        }

        function onClick(event) {
            raycaster.setFromCamera(pointer, camera);
            num++;
            if (raycaster.intersectObjects(scene.children).length > 0) {
                // console.log(raycaster.intersectObjects(scene.children)[0].object.name);
                setTar(raycaster.intersectObjects(scene.children)[0].object.name);
               
            } else {
            }
           
        }

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("click", onClick);

        function reset() {
            try {
                room.children[23].material.color.set(colstate.wall);
            } catch (err) { }
        }

        console.log(room);

        var animate = function () {
            requestAnimationFrame(animate);
            reset()

            controls.update();
            renderer.render(scene, camera);
        };

        let onWindowResize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5);
        };

        window.addEventListener("resize", onWindowResize, false);

        animate();

        return () => mountRef.current.removeChild(renderer.domElement);
    }, [colstate.wall]);



    return (
        <ColourContext.Provider value={colstate}>
            <h2 className="canvastitle">Mesh selected : {tar}</h2>
            <div className="canvasdiv" ref={mountRef}></div>
            <FF namee={tar} col={colstate.wall} />
        </ColourContext.Provider>
    );
};

export default ColourPicker;
