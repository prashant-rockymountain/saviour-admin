import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const TextEditor = dynamic(() => import("react-draft-wysiwyg").then((mod) => mod.Editor),{ ssr: false });
