import React, { useRef, useContext, useState } from 'react'
import "./Test1.css"
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { PerspectiveCamera } from '@react-three/drei/native'
import { Suspense } from 'react'
import { AxesHelper } from 'three'
import { HexColorPicker } from 'react-colorful'

export const ColourContext = React.createContext()

function Model({ ...props }) {
    const group = useRef()
    const wall = useRef()
    const ceil = useRef()

    const { nodes, materials } = useGLTF('room_camera_geometry.glb')

    const col1 = useContext(ColourContext)
    // const material_copy = structuredClone(materials.wall);
    // let colour1 = props.col;

    // useFrame(({ clock }) => {
    //     // group.current.rotation.y = clock.getElapsedTime()
    //     // wall.current.material.color = colour1
    // })
    // console.log(wall.current)
    const [hovered, setHovered] = useState(null);

    return (
        <>
            <h1>{hovered != null ? hovered : null}
                {hovered === null ? col1.current : null}</h1>

            <Canvas
                style={{ height: "100%" }}
                camera={{ fov: 70, position: [6.5, 1, 2.5] }}
            >
                {/* <primitive object={new AxesHelper(10)} /> */}
                {/* <Suspense fallback={console.log("waiting")}></Suspense> */}
                <ambientLight />
                <directionalLight intensity={2} position={[110, 110, 165]} />
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

                <group ref={group} {...props} dispose={null}
                    scale={1} position={[0, 2, 4]}
                    onPointerOver={(e) => {
                        e.stopPropagation();
                        setHovered(e.object.material.name);
                        // col1.current = e.object.material.name;
                    }}
                    onPointerOut={(e) => { e.intersections.length === 0 && setHovered(null) }}
                    onPointerDown={(e) => {
                        e.stopPropagation();
                        col1.current = e.object.material.name
                    }}
                    onPointerMissed={(e) => { col1.current = null }}
                >
                    <group position={[1.31, 26.08, -3.67]} rotation={[0, Math.PI / 2, 0]}>
                        <PerspectiveCamera makeDefault={false} far={1000} near={0.1} fov={17.14} rotation={[-Math.PI / 2, 0, 0]} />
                    </group>
                    <group position={[-2.7, -1.2, -9.45]} rotation={[1.6, -0.02, 2.36]}>
                        <PerspectiveCamera makeDefault={false} far={1000} near={0.1} fov={45.75} rotation={[-Math.PI / 2, 0, 0]} />
                    </group>
                    <group position={[5.32, -1.2, -9.45]} rotation={[1.6, 0.02, -2.36]}>
                        <PerspectiveCamera makeDefault={false} far={1000} near={0.1} fov={45.75} rotation={[-Math.PI / 2, 0, 0]} />
                    </group>
                    <group position={[5.32, -1.2, 2.12]} rotation={[1.55, 0.02, -0.79]}>
                        <PerspectiveCamera makeDefault={false} far={1000} near={0.1} fov={45.75} rotation={[-Math.PI / 2, 0, 0]} />
                    </group>
                    <group position={[-2.2, -1.2, 2.12]} rotation={[1.55, -0.02, 0.79]}>
                        <PerspectiveCamera makeDefault={false} far={1000} near={0.1} fov={45.75} rotation={[-Math.PI / 2, 0, 0]} />
                    </group>


                    <group position={[2.52, 0, -0.21]} rotation={[Math.PI / 2, 0, Math.PI]}>
                        <mesh geometry={nodes.bolts.geometry} material={materials.bolt_mat} position={[-0.15, 0, 0]} rotation={[Math.PI / 2, 0, 0]} scale={0} />
                        <mesh geometry={nodes.deflector.geometry} material={materials.vent_mat} rotation={[Math.PI / 2, 0, 0]} />
                        <mesh geometry={nodes.grille.geometry} material={materials.vent_mat} position={[0, 0.08, 0]} rotation={[0, 0, -Math.PI / 2]} />
                        <mesh geometry={nodes.vent_body.geometry} material={materials.vent_mat} rotation={[Math.PI / 2, 0, 0]} />
                    </group>


                    <group position={[1.64, 0, -1.05]} rotation={[Math.PI / 2, 0, Math.PI]}>
                        <mesh geometry={nodes.emission_plane.geometry} material={materials.emission_plane} position={[0, 0, 0.02]} rotation={[-Math.PI / 2, 0, 0]} />
                        <mesh geometry={nodes.light_bracket.geometry} material={materials.light_bracket_mat} rotation={[-Math.PI / 2, 0, 0]} />
                        <mesh geometry={nodes.Sphere.geometry} material={materials.light_glass_mat} rotation={[-Math.PI / 2, 0, 0]} />
                    </group>


                    <group position={[-0.08, -2.19, -1.81]} rotation={[0, Math.PI / 2, 0]}>
                        <mesh geometry={nodes.Socket.geometry} material={materials.Material} />
                    </group>


                    <group position={[3.19, -2.18, -0.57]} rotation={[0, -Math.PI / 2, 0]}>
                        <mesh geometry={nodes.Socket001.geometry} material={materials['Material.001']} />
                    </group>


                    <group position={[1.67, 0, -5.73]} rotation={[Math.PI / 2, 0, Math.PI]}>
                        <mesh geometry={nodes.emission_plane001.geometry} material={materials['emission_plane.001']} position={[0, 0, 0.02]} rotation={[-Math.PI / 2, 0, 0]} />
                        <mesh geometry={nodes.light_bracket001.geometry} material={materials['light_bracket_mat.001']} rotation={[-Math.PI / 2, 0, 0]} />
                        <mesh geometry={nodes.Sphere001.geometry} material={materials['light_glass_mat.001']} rotation={[-Math.PI / 2, 0, 0]} />
                    </group>


                    <group position={[3.19, -2.54, -2.98]} rotation={[0, -Math.PI / 2, 0]} scale={2.4}>
                        <group position={[0.16, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.42}>
                            <group position={[-0.91, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
                                <mesh geometry={nodes.brass_lock_attached002.geometry} material={materials.brushed_metal_long_mat} rotation={[Math.PI / 2, 0, 0]} />
                                <mesh geometry={nodes.brass_lock_attached003.geometry} material={materials.brushed_metal_long_mat} rotation={[Math.PI / 2, 0, 0]} />
                            </group>
                            <group position={[-1.52, -0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
                                <group position={[0.09, 0, 0.01]}>
                                    <mesh geometry={nodes.Cylinder009.geometry} material={materials.metal_latch_mat} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[1.27, 1, 1.27]} />
                                    <mesh geometry={nodes.Plane002.geometry} material={materials.metal_latch_mat} rotation={[Math.PI / 2, 0, 0]} />
                                    <mesh geometry={nodes.Plane003.geometry} material={materials.metal_latch_mat} position={[0, -0.02, 0.01]} rotation={[Math.PI / 2, 0, 0]} scale={0.32} />
                                    <mesh geometry={nodes.Plane004.geometry} material={materials.metal_latch_mat} position={[0, -0.11, 0.01]} rotation={[1.74, 0.06, 0.35]} />
                                </group>
                                <mesh geometry={nodes.Cylinder.geometry} material={materials.metal_latch_mat} position={[-0.03, 0.01, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[1.27, 1, 1.27]} />
                                <mesh geometry={nodes.Plane001.geometry} material={materials.metal_latch_mat} rotation={[Math.PI / 2, 0, 0]} />
                            </group>
                        </group>
                        <mesh geometry={nodes.door_frame_36.geometry} material={materials.white_door_mat} scale={0.42} />
                        <mesh geometry={nodes.door_panel_36.geometry} material={materials.white_door_mat} position={[0, 0, -0.13]} scale={0.42} />
                        <mesh geometry={nodes.hinge.geometry} material={materials.metal_latch_mat} position={[-0.16, 0.12, 0]} scale={0.42} />
                    </group>


                    <group position={[-0.83, -2.54, -2.58]} scale={2.4}>
                        <group position={[0.16, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.42}>
                            <group position={[-0.91, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
                                <mesh geometry={nodes.brass_lock_attached004.geometry} material={materials.brushed_metal_long_mat} rotation={[Math.PI / 2, 0, 0]} />
                                <mesh geometry={nodes.brass_lock_attached005.geometry} material={materials.brushed_metal_long_mat} rotation={[Math.PI / 2, 0, 0]} />
                            </group>
                            <group position={[-1.52, -0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
                                <group position={[0.09, 0, 0.01]}>
                                    <mesh geometry={nodes.Plane006.geometry} material={materials.metal_latch_mat} rotation={[Math.PI / 2, 0, 0]} />
                                    <mesh geometry={nodes.Plane007.geometry} material={materials.metal_latch_mat} position={[0, -0.02, 0.01]} rotation={[Math.PI / 2, 0, 0]} scale={0.32} />
                                    <mesh geometry={nodes.Cylinder011.geometry} material={materials.metal_latch_mat} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[1.27, 1, 1.27]} />
                                    <mesh geometry={nodes.Plane008.geometry} material={materials.metal_latch_mat} position={[0, -0.11, 0.01]} rotation={[1.74, 0.06, 0.35]} />
                                </group>
                                <mesh geometry={nodes.Cylinder010.geometry} material={materials.metal_latch_mat} position={[-0.03, 0.01, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[1.27, 1, 1.27]} />
                                <mesh geometry={nodes.Plane005.geometry} material={materials.metal_latch_mat} rotation={[Math.PI / 2, 0, 0]} />
                            </group>
                        </group>
                        <mesh geometry={nodes.door_frame_36001.geometry} material={materials.white_door_mat} scale={0.42} />
                        <mesh geometry={nodes.door_panel_36001.geometry} material={materials.white_door_mat} position={[0, 0, -0.13]} scale={0.42} />
                        <mesh geometry={nodes.hinge001.geometry} material={materials.metal_latch_mat} position={[-0.16, 0.12, 0]} scale={0.42} />
                    </group>


                    <group position={[3.19, -2.54, -2.98]} rotation={[0, -Math.PI / 2, 0]} scale={2.4} />


                    <group position={[-2.19, -2.54, -3.19]} rotation={[0, -Math.PI / 2, 0]} scale={2.4}>
                        <group position={[0.16, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.42}>
                            <group position={[-0.91, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
                                <mesh geometry={nodes.brass_lock_attached006.geometry} material={materials.brushed_metal_long_mat} rotation={[Math.PI / 2, 0, 0]} />
                                <mesh geometry={nodes.brass_lock_attached007.geometry} material={materials.brushed_metal_long_mat} rotation={[Math.PI / 2, 0, 0]} />
                            </group>
                            <group position={[-1.52, -0.06, 0]} rotation={[0, 0, Math.PI / 2]}>
                                <group position={[0.09, 0, 0.01]}>
                                    <mesh geometry={nodes.Plane010_1.geometry} material={materials.metal_latch_mat} rotation={[Math.PI / 2, 0, 0]} />
                                    <mesh geometry={nodes.Plane011_1.geometry} material={materials.metal_latch_mat} position={[0, -0.02, 0.01]} rotation={[Math.PI / 2, 0, 0]} scale={0.32} />
                                    <mesh geometry={nodes.Cylinder013.geometry} material={materials.metal_latch_mat} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[1.27, 1, 1.27]} />
                                    <mesh geometry={nodes.Plane012_1.geometry} material={materials.metal_latch_mat} position={[0, -0.11, 0.01]} rotation={[1.74, 0.06, 0.35]} />
                                </group>
                                <mesh geometry={nodes.Cylinder012.geometry} material={materials.metal_latch_mat} position={[-0.03, 0.01, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[1.27, 1, 1.27]} />
                                <mesh geometry={nodes.Plane009.geometry} material={materials.metal_latch_mat} rotation={[Math.PI / 2, 0, 0]} />
                            </group>
                        </group>
                        <mesh geometry={nodes.door_frame_36002.geometry} material={materials.white_door_mat} scale={0.42} />
                        <mesh geometry={nodes.door_panel_36002.geometry} material={materials.white_door_mat} position={[0, 0, -0.13]} scale={0.42} />
                        <mesh geometry={nodes.hinge002.geometry} material={materials.metal_latch_mat} position={[-0.16, 0.12, 0]} scale={0.42} />
                    </group>


                    {/* ----------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                    <group position={[-1.56, -2.54, -3.76]} rotation={[-Math.PI, 0, -Math.PI]} scale={2.4}>
                        <group position={[0.16, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={0.42}>
                            <group position={[-0.91, -0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
                                <mesh geometry={nodes.brass_lock_attached008.geometry} material={materials.brushed_metal_long_mat} rotation={[Math.PI / 2, 0, 0]} />
                                <mesh geometry={nodes.brass_lock_attached009.geometry} material={materials.brushed_metal_long_mat} rotation={[Math.PI / 2, 0, 0]} />
                            </group>

                            {/* -------------------------------------------------------------------------------------------- */}

                            <group position={[-1.52, -0.06, 0]} rotation={[0, 0, Math.PI / 2]}>

                                {/* ----------------------------------------------------------------------------- */}
                                <group position={[0.09, 0, 0.01]}>

                                    <mesh geometry={nodes.Plane015.geometry} material={materials.metal_latch_mat} position={[0, -0.02, 0.01]} rotation={[Math.PI / 2, 0, 0]} scale={0.32} />
                                    <mesh geometry={nodes.Cylinder015_1.geometry} material={materials.metal_latch_mat} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[1.27, 1, 1.27]} />
                                    {/* <mesh geometry={nodes.Plane014_1.geometry} material={materials.metal_latch_mat} rotation={[Math.PI / 2, 0, 0]} /> */}
                                    <mesh geometry={nodes.Plane016.geometry} material={materials.metal_latch_mat} position={[0, -0.11, 0.01]} rotation={[1.74, 0.06, 0.35]} />

                                </group>
                                {/* ------------------------------------------------------------------------------ */}

                                <mesh geometry={nodes.Cylinder014.geometry} material={materials.metal_latch_mat} position={[-0.03, 0.01, 0]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} scale={[1.27, 1, 1.27]} />
                                <mesh geometry={nodes.Plane013.geometry} material={materials.metal_latch_mat} rotation={[Math.PI / 2, 0, 0]} />
                            </group>

                            {/* ------------------------------------------------------------------------------------------------- */}

                        </group>
                        <mesh geometry={nodes.door_frame_36003.geometry} material={materials.white_door_mat} scale={0.42} />
                        <mesh geometry={nodes.door_panel_36003.geometry} material={materials.white_door_mat} position={[0, 0, -0.13]} scale={0.42} />
                        <mesh geometry={nodes.hinge003.geometry} material={materials.metal_latch_mat} position={[-0.16, 0.12, 0]} scale={0.42} />
                    </group>

                    {/*  ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}

                    <group position={[2.08, -1.55, 0]} rotation={[-Math.PI, 0, -Math.PI]} scale={[0.62, 0.78, 1]}>
                        <group position={[0, 0.01, -0.08]} scale={[1.5, 1.5, 3]}>
                            <mesh geometry={nodes.Cube001.geometry} material={materials.window_glass_mat} />
                            <mesh geometry={nodes.Cube001_1.geometry} material={materials.window_rails_mat} />
                            <mesh geometry={nodes.handle_L.geometry} material={materials.brushed_metal_mat} position={[-0.6, 0.52, 0.01]} scale={[0.03, 0.03, 0.02]} />
                        </group>
                        <group position={[0, 0.01, -0.14]} scale={[1.5, 1.5, 3]}>
                            <mesh geometry={nodes.Cube003.geometry} material={materials.window_glass_mat} />
                            <mesh geometry={nodes.Cube003_1.geometry} material={materials.window_rails_mat} />
                            <mesh geometry={nodes.handle_R.geometry} material={materials.brushed_metal_mat} position={[0.6, 0.52, 0.01]} rotation={[-Math.PI, 0, 0]} scale={[-0.03, -0.03, -0.02]} />
                        </group>
                        <mesh geometry={nodes.rails.geometry} material={materials.window_rails_mat} position={[0, 0.01, -0.19]} scale={[1.5, 1.5, 3]} />
                    </group>
                    <group position={[1.1, -1.6, -7.33]} scale={[0.7, 0.83, 1]}>
                        <group position={[0, 0.01, -0.08]} scale={[1.5, 1.5, 3]}>
                            <mesh geometry={nodes.Cube006.geometry} material={materials['window_glass_mat.001']} />
                            <mesh geometry={nodes.Cube006_1.geometry} material={materials['window_rails_mat.001']} />
                            <mesh geometry={nodes.handle_L001.geometry} material={materials['window_handle_mat.001']} position={[-0.6, 0.52, 0.01]} scale={[0.03, 0.03, 0.02]} />
                        </group>
                        <group position={[0, 0.01, -0.14]} scale={[1.5, 1.5, 3]}>
                            <mesh geometry={nodes.Cube008.geometry} material={materials['window_glass_mat.001']} />
                            <mesh geometry={nodes.Cube008_1.geometry} material={materials['window_rails_mat.001']} />
                            <mesh geometry={nodes.handle_R001.geometry} material={materials['window_handle_mat.001']} position={[0.6, 0.52, 0.01]} rotation={[-Math.PI, 0, 0]} scale={[-0.03, -0.03, -0.02]} />
                        </group>
                        <mesh geometry={nodes.rails001.geometry} material={materials.window_rails_mat} position={[0, 0.01, -0.19]} scale={[1.5, 1.5, 3]} />
                    </group>
                    <mesh geometry={nodes.wall_0.geometry} material={materials.wall} />
                    <mesh geometry={nodes.wall_1.geometry} material={materials.wall} />
                    <mesh geometry={nodes.wall_2.geometry} material={materials.wall} />
                    <mesh geometry={nodes.wall_3.geometry} material={materials.wall} />
                    <mesh geometry={nodes.wall_4.geometry} material={materials.wall} />
                    <mesh ref={wall} geometry={nodes.wall_5.geometry} material={materials.wall} material-color={col1.wall} />
                    <mesh geometry={nodes.floor.geometry} material={materials.carpet_floor} />
                    <mesh ref={ceil} geometry={nodes.ceiling.geometry} material={materials.ceiling} material-color={col1.ceil} />
                    <mesh geometry={nodes.wall_6.geometry} material={materials.wall} />
                    <mesh geometry={nodes.wall_7.geometry} material={materials.wall} />
                </group>

            </Canvas>

        </>
    )
}


function Input() {
    const col1 = useContext(ColourContext)
    let update = {}
    return (<>
        <b>Ceiling colour : </b>
        <input id="col_val" />
        <button type="button" onClick={() => {

            // colours.items.ceil = document.getElementById('col_val').value;
            // console.log(colours.items.ceil);
            update = { ceil: document.getElementById('col_val').value }
            // setColstate(prev => ({
            //     ...prev,
            //     ...update
            // }))
            // console.log(colstate)
            col1.ceil = document.getElementById('col_val').value
        }}>
            submit
        </button>
        <br />
        <br />
        <b>Wall colour : </b>
        <input id="col_val1" />
        <button type="button" onClick={() => {
            update = { wall: document.getElementById('col_val1').value }
            // setColstate(prev => ({
            //     ...prev,
            //     ...update
            // }))
            // console.log(colstate)
            col1.wall = document.getElementById('col_val1').value
        }}>
            submit
        </button>
    </>)
}


function Picker() {
    const col1 = useContext(ColourContext)
    console.log(col1[col1.current])
    const [selected, setSelected] = useState(null);
    return (<div>

        <HexColorPicker
            color={col1.current === "wall" ? col1.wall : col1.ceil}
            onChange={(color) => {
                // console.log(color)
                if (col1.current === "wall") {
                    col1.wall = color
                } else if (col1.current === "ceiling") {
                    col1.ceil = color
                }
                // col1[col1.current] = color
            }} />
    </div>)
}


const Test1 = () => {

    const [colstate, setColstate] = useState({
        current: null,
        ceil: "white",
        wall: "blue"
    })



    return (
        <ColourContext.Provider value={colstate}>
            <div className='wrapper1'>
                <Model />
                <div className="reading">
                    <Input />
                </div>
                {/* {colstate.current} */}
                <Picker />
            </div>


        </ColourContext.Provider >
    )
}

export default Test1