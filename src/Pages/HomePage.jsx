import { useEffect } from "react";
import Layout from "../Layout/Layout";
import { useStore } from "../Store/Store";

export default function HomePage(){
      const {fetchCustomers}  =  useStore()
useEffect(()=>{
    fetchCustomers()
})
    return(
        <Layout>
        <h1>Preview</h1>
        </Layout>
    )
}