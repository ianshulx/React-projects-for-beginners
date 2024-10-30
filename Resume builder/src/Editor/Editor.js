import React, { useState } from 'react'
import styles from "./Editor.module.css"
function Editor(props) {
    const sections = props.sections;

    const [activeSectionKey, setActiveSectionKey]=useState(
        Object.keys(sections)[0]
    );
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {Object.keys(sections)?.map((key)=>(
                    <div 
                    className={`${styles.section} ${
                        activeSectionKey === key?  styles.active:""
                    }`}
                    key ={key}
                    onClick={()=> setActiveSectionKey(key)}>
                        {sections[key]}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Editor;
