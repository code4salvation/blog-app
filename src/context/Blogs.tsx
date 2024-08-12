import { createContext, useState } from "react";

export const BlogContext = createContext(null);

export const BlogsProvider = (props) => {
    const [blogs, setBlogs] = useState([]);
    return (
        <BlogContext.Provider value={{blogs, setBlogs}}>{props.children}</BlogContext.Provider>
    )
}