import { CodeEditorState } from "./../types/index";
// import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";
import { create } from "zustand";
// import { Monaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { LANGUAGE_CONFIG } from "@/app/(root)/_constants";

const getInitialState = () => {
    //if we are on server side return default values 
    if (typeof window === "undefined") {
        return {
            language: "javascript",
            fontSize: 16,
            theme: "vs-dark",
        }
    }

    //but if we r on client side then we take data from local storage ad it is a browser api
    const savedLanguage = localStorage.getItem("editor-language") || "javascript";
    const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
    const savedFontSize = localStorage.getItem("editor-font-size") || 16;

    return {
        language: savedLanguage,
        theme: savedTheme,
        fontSize: Number(savedFontSize),
    }
}

export const useCodeEditorStore = create<CodeEditorState>((set, get) => {
    //used for like when we  first refreshes we want some data to be there like font size some code and theme or language using that why creating this
    // const initialState= getInitialState();

    // return{
    //     ...initialState,
    //     output:"",
    //     isRunning:false,
    //     error:null,
    //     editor:null,
    //     executionResult:null,

    //     getCode:() => get().editor?.

    // }
    const initialState = getInitialState();

    return {
        ...initialState,
        output: "",
        isRunning: false,
        error: null,
        editor: null,
        executionResult: null,
        isHydrated: false,

        hydrate: () => {
            if (typeof window !== "undefined") {
                const savedLanguage = localStorage.getItem("editor-language") || "javascript";
                const savedTheme = localStorage.getItem("editor-theme") || "vs-dark";
                const savedFontSize = localStorage.getItem("editor-font-size") || 16;

                set({
                    language: savedLanguage,
                    theme: savedTheme,
                    fontSize: Number(savedFontSize),
                    isHydrated: true,
                });
            }
        },

        getCode: () => get().editor?.getValue() || "",


        // setEditor: (editor: Monaco) => {
        //   const savedCode = localStorage.getItem(`editor-code-${get().language}`);
        //   if (savedCode) editor.setValue(savedCode);

        //   set({ editor });
        // },
        setEditor: (editor: monaco.editor.IStandaloneCodeEditor) => {
            const savedCode = localStorage.getItem(`editor-code-${get().language}`);
            if (savedCode) editor.setValue(savedCode);

            set({ editor });
        },

        setTheme: (theme: string) => {
            localStorage.setItem("editor-theme", theme);
            set({ theme });
        },

        setFontSize: (fontSize: number) => {
            localStorage.setItem("editor-font-size", fontSize.toString());
            set({ fontSize });
        },

        setLanguage: (language: string) => {
            // Save current language code before switching
            const currentCode = get().editor?.getValue();
            if (currentCode) {
                localStorage.setItem(`editor-code-${get().language}`, currentCode);
            }

            localStorage.setItem("editor-language", language);

            set({
                language,
                output: "",
                error: null,
            });
        },
        runCode: async()=>{
            const {language,getCode}=get()
            const code=getCode();

            if(!code){
                set({error:"Please Enter Some Code"})
                return; 
            }

            set({isRunning:true,error:null,output:""})
            try {
                const runtime=LANGUAGE_CONFIG[language].pistonRuntime;
                const response = await fetch("https://emkc.org/api/v2/piston/execute",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({
                        language:runtime.language,
                        version:runtime.version,
                        files:[{content:code}]
                    })
                })

                const data=await response.json();
                console.log("data back from piston:",data); 
                
                //handle api-level errors
                if(data.message){
                    set({error:data.message,executionResult:{code,output:"",error:data.message}})
                    return
                }

                //handle compile errors
                if(data.compile && data.compile.code!==0){
                    const error=data.compile.stderr || data.compile.output;
                    set({
                        error,
                        executionResult:{
                            code,
                            output:"",
                            error
                        }
                    })
                    return
                }

                //runtime error
                if(data.run && data.run.code!==0){
                    const error=data.run.stderr || data.run.output;
                    set({
                        error,
                        executionResult:{
                            code,
                            output:"",
                            error
                        }
                    })
                    return
                }
                //execution succesfull
                const output=data.run.output;
                set({
                    output:output.trim(),
                    error:null,
                    executionResult:{
                        code,
                        output:output.trim(),
                        error:null,
                    }
                })

            } catch (error) {
                console.log("Error Runnning code:",error)
                set({
                    error:"Error Running Code",
                    executionResult:{
                        code,
                        output:"",
                        error:"Error Running code"
                    }
                })
            } finally{
                set({isRunning:false});
            }

        }
    }
});

export const getExecutionResult=()=> useCodeEditorStore.getState().executionResult;