"use client";
import { useRef } from "react";
import addTransaction from "@/app/actions/addTransaction";
import {toast} from 'react-toastify';


const AddTransaction = () => {

    const fromRef = useRef<HTMLFormElement>(null);

    const clientAction = async (formData: FormData) => {
        // console.log(formData.get('text'), formData.get('amount'));
        const {data, error} = await  addTransaction(formData);

        if(error) {
            toast.error(error);
         
        }else {
             toast.success('Transaction Added');
             fromRef.current?.reset();
             
        }
    };


    return (
        <>
        <h3>Add Transaction</h3>
        <form ref={fromRef} action= {clientAction}>
            <div className="form-control">
                <label htmlFor="text">Text</label>
                <input type="text" id="text" name="text" placeholder="Enteer task..."/>
            </div>
            <div className="form-control">
                <label htmlFor="amount">Amount <br/>(negative - expense, positive - income)</label>
                <input type="number" id="amount" name="amount" placeholder="Enter amount..." step='0.01' />
            </div>

            <button className="btn">Add transaction</button>
        </form>
        </>
    )
}
export default AddTransaction;