import React, { useEffect, useState } from 'react';
import './Manage.css';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { ManageThunkAction } from '../Redux/Thunk/ManageThunk';
import { PoultryThunckAction } from '../Redux/Thunk/PoultryThunk';
import { ExpenseThunkAction } from '../Redux/Thunk/Expensethunk';
import { FormThunkAction } from '../Redux/Thunk/FormThunk';
import { PatchThunkAction } from '../Redux/Thunk/PatchThunk';
import { UpdateThunkAction } from '../Redux/Thunk/UpdateThunk';
import { DeleteThunkAction } from '../Redux/Thunk/DeleteThunk';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import load from '../assets/load.gif';
import { IoMdArrowDropdown } from "react-icons/io";


const ManageExpense = () => {
    const [id, setId] = useState();
    const [poultryId, setPoultryId] = useState('');
    const [expenseHeadId, setExpenseHeadId] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [amount, setAmount] = useState('');
    const [errors, setErrors] = useState({});
    const [isEditMode, setIsEditMode] = useState(false);
    const [deleteData, setDeleteData] = useState(null);
    const [modalType, setModalType] = useState('');

    const dispatch = useDispatch();

    const parseAmount = (amount) => {
        const cleanAmount = amount.replace(/,/g, '');
        const parsedAmount = parseFloat(cleanAmount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
            return null;
        }
        return parsedAmount;
    };

    const Create = useSelector(state => state.FormReducer?.data?.data);
    const Deletes = useSelector(state => state.DeleteReducer?.data?.data);
    const Updates = useSelector(state => state.UpdateReducer?.data?.data);
    const Loading = useSelector(state => state.FormReducer?.loading);

    const payload = {
        id: null,
        poultryId,
        expenseHeadId,
        description,
        date,
        amount: parseAmount(amount),
    };

    const UpdatePayload = {
        id,
        poultryId,
        expenseHeadId,
        description,
        date,
        amount: parseAmount(amount),
    };

    const resetFormFields = () => {
        setPoultryId('');
        setExpenseHeadId('');
        setDescription('');
        setDate('');
        setAmount('');
        setErrors({});
        setIsEditMode(false);
    };

    const handleSubmit = () => {
        const newErrors = {};

        if (!poultryId) newErrors.poultry = "Required";
        if (!expenseHeadId) newErrors.expense = "Required";
        if (!description) newErrors.description = "Required";
        if (!amount || parseAmount(amount) === null) newErrors.amount = "Required";
        if (parseAmount(amount) <= 0) newErrors.amount = "Amount must be greater than zero";
        if (!date) newErrors.date = "Required";
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch(FormThunkAction(payload)).then(() => {
                setTimeout(() => {
                    dispatch(ManageThunkAction()) }, 2000);
                setModalType('');
                toast.success(Create, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            });
        }
    };

    const handleUpdate = () => {
        if (isEditMode) {
            dispatch(UpdateThunkAction(UpdatePayload)).then(()=>{
                   setTimeout(()=>{
                dispatch(ManageThunkAction())
              },3000)
                setModalType('');
                toast.success(Updates, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });

                setIsEditMode(false);
            })
           
              
            
        }
    };

    const handleDelete = (data) => {
        setDeleteData(data);
        setModalType('delete');
    };

    const handleDeleteConfirm = () => {
        if (deleteData) {
            dispatch(DeleteThunkAction(deleteData)).then(()=>{
                setTimeout(()=>{
                    dispatch(ManageThunkAction()) 
                },1000)
                    setModalType('');
                    toast.success(Deletes, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                    });
              
            })
               
            
        }
    };

    const getCurrentDate = () => {
        const today = new Date(date);
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();

        return `${day}-${month}-${year}`;
    };

    const poultry = useSelector(state => state.PoultryReducer?.data?.data);
    const expense = useSelector(state => state.ExpenseReducer?.data?.data);
    const manage = useSelector(state => state.ManageReducer?.data?.data);
    const delteLoading = useSelector(state =>state.DeleteReducer?.loading);
    const UpdateLoading = useSelector(state =>state.UpdateReducer?.loading);
    const Manage = useSelector(state =>state.ManageReducer?.loading)

    console.log("Del_load",delteLoading)

    useEffect(() => {
        dispatch(ManageThunkAction());
        dispatch(PoultryThunckAction());
        dispatch(ExpenseThunkAction());
    }, [dispatch]);

    const handlePatch = (data) => {
     
    dispatch(PatchThunkAction({ id: data.id }));
        setModalType('edit');
        setId(data.id);
        setPoultryId(data.poultryId);
        setExpenseHeadId(data.expenseHeadId);
        setDescription(data.description);
        setDate(getCurrentDate(data.date));
        setAmount(data.amount);
        setIsEditMode(true);
        setErrors({})


        // const updateErrors = {};

        // if (!poultryId) updateErrors.poultry = "Required";
        // if (!expenseHeadId) updateErrors.expense = "Required";
        // if (!description) updateErrors.description = "Required";
        // if (!amount || parseAmount(amount) === null) updateErrors.amount = "Required";
        // if (parseAmount(amount) <= 0) updateErrors.amount = "Amount must be greater than zero";
        // if (!date) updateErrors.date = "Required";
        // setErrors(updateErrors);

   };

   const token = localStorage.getItem('token')
useEffect(()=>{
    if(!token){
        window.location.href='/'
    }
},[token])

const handleLogout =()=>{
localStorage.removeItem('token')
  window.location.href='/'

}

    const renderModal = () => {
        if (!modalType) return null;

        return (
         <>
        
                     <div className={`modal ${modalType ? 'show' : ''}`} style={{ display: modalType ? 'block' : 'none' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                {modalType === 'create' && 'CREATE EXPENSE'}
                                {modalType === 'edit' && 'EDIT EXPENSE'}
                                {modalType === 'delete' && 'DELETE EXPENSE'}
                            </h4>
                            <button type="button" className="btn-close" onClick={() => setModalType('')}></button>
                        </div>
                        <div className="modal-body">
                            {modalType === 'delete' ? (
                                <p>Are you sure you want to delete this expense?</p>
                            ) : (
                                <form>
                                    <label className='form-label'>Poultry<span style={{ color: 'red' }}>*</span></label>
                                    <select className='form-control'
                               
                                        value={poultryId}
                                        onChange={(e) => setPoultryId(e.target.value)}>
                                        <option value="">Select Poultry</option>
                                
                                        {poultry?.map((item) => (
                                            <option key={item?.id} value={item?.id}>{item?.poultryName}</option>
                                        ))}
                                              
                                    </select>
                                    {errors.poultry && <p style={{ color: "red" }}>{errors.poultry}</p>}

                                    <label className='form-label'>Expense Type <span style={{ color: 'red' }}>*</span></label>
                                    <select className='form-control'
                                        value={expenseHeadId}
                                        onChange={(e) => setExpenseHeadId(e.target.value)}>
                                        <option value=''>Select Expense</option>
                                        {expense?.map(food => (
                                            <option key={food?.id} value={food?.id}>{food?.expenseType}</option>
                                        ))}
                                    </select>
                                    {errors.expense && <p style={{ color: "red" }}>{errors.expense}</p>}

                                    <label className='form-label'>Description <span style={{ color: 'red' }}>*</span></label>
                                    <input className='form-control'
                                        type='text'
                                        value={description}
                                        placeholder='Description'
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    {errors.description && <p style={{ color: "red" }}>{errors.description}</p>}

                                    <label className='form-label'>Date <span style={{ color: 'red' }}>*</span></label>
                                    <input className='form-control'
                                        type='date'
                                        min={getCurrentDate('2024/08/15')}
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}

                                    <label className='form-label'>Amount <span style={{ color: 'red' }}>*</span></label>
                                    <input className='form-control'
                                        type='number'
                                        value={amount}
                                        placeholder='Amount'
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                    {errors.amount && <p style={{ color: "red" }}>{errors.amount}</p>}
                                </form>
                            )}
                        </div>
                        <div className="modal-footer">
                            {modalType === 'create' && (
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                            )}
                            {modalType === 'edit' && (
                                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Submit</button>
                            )}
                            {modalType === 'delete' && (
                                <>
                                <div style={{display:"flex"}}>
                                    <span style={{justifyContent:"space-between"}}>
                                    <button type="button"style={{marginLeft:"20px",borderRadius:"5px",padding:"4px",color:"white",backgroundColor:"red",border:"1px solid red"}}  onClick={() => setModalType('')}>Cancel</button>
                                    <button type="button" style={{marginLeft:"20px",borderRadius:"5px",padding:"4px",color:"white",backgroundColor:"blue",border:"1px solid blue"}}  onClick={handleDeleteConfirm}>Delete</button>
                                    </span>
                               
                                </div>
                            
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            </>
        );
    };

    return (
        <>
            {( Loading || delteLoading || UpdateLoading)  ? (
                <div className="loading-container">
                  <img src={load} alt='loading'></img>
                    <h1>Loading...</h1>
                </div>
            ) : (
                

                <div className="container">
                   
                    <ToastContainer />
                    <div className="title d-flex">
                        <p style={{ fontSize: "20px" }}>
                            MANAGE EXPENSE 
                            </p>
                            <span style={{ fontSize: "13px" }}>
                                <button className='btns' onClick={() => { resetFormFields(); setModalType('create'); }}> + New Manage Expense</button>
                                <button style={{marginLeft:"20px",borderRadius:"5px",padding:"4px",color:"white",backgroundColor:"blue",border:"1px solid blue"}} onClick={handleLogout} >Logout</button>
                            </span>
                       
                    </div>

                    {renderModal()}

                    <table className="table table-striped">
                        <thead className='the'>
                            <tr className='tr'>
                                <th>S.NO</th>
                                <th>POULTRY</th>
                                <th>EXPENSE TYPE</th>
                                <th>DATE</th>
                                <th>AMOUNT</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {manage?.map((data, index) => (
                                <tr key={data.id}>
                                    <td>{index + 1}</td>
                                    <td>{data.poultryName}</td>
                                    <td>{data.expenseType}</td>
                                    <td>{data.date}</td>
                                    <td>{data.amount}</td>
                                    <td>
                                        <FaRegEdit style={{ marginRight: "15px", fontSize: "20px", color: "green" }} onClick={() => handlePatch(data)} />
                                        <RiDeleteBin6Line style={{ fontSize: "20px", color: "red" }} onClick={() => handleDelete(data)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
            )}
        </>
    );
}

export default ManageExpense;
