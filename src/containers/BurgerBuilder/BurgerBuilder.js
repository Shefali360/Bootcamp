import React,{ Component } from "react";
import Aux from '../../hoc/Aux';
import Burger from '../../components/Layout/Burger/Burger';
import BuildControls from '../../components/Layout/Burger/BuildControls/BuildControls';
import Modal from '../../components/Layout/UI/Modal/Modal';
import OrderSummary from '../../components/Layout/Burger/OrderSummary/OrderSummary';


const INGREDIENTS_PRICES={
    salad:1,
    cheese:5,
    bacon:2,
    meat:6
}
class BurgerBuilder extends Component{
    constructor(props){
        super(props);
        this.state={
            ingredients:{
                salad:0,
                bacon:0,
                cheese:0,
                meat:0
            },
            totalPrice:0,
            purchasable:false,
            purchasing:false
        }
    }

     updatePurchaseState(ingredients){
     const sum=Object.keys(ingredients).map(item=>{
       return ingredients[item];
       }).reduce((sum,el)=>{
            return sum+el;
         },0);
    this.setState=({
        purchasable: sum > 0
     });
     }

     purchaseHandler=()=>{
         this.setState({purchasing:true})
     }

     purchaseCancelHandler=()=>{
         this.setState({purchasing:false});
     }

     purchaseContinueHandler=()=>{
         alert("Continue");
     }
     
     

    addIngredientHandler=(type)=>{
            const oldCount=this.state.ingredients[type];
            const updatedCount=oldCount+1;
            const updatedIngredients={
                ...this.state.ingredients
            };
            updatedIngredients[type]=updatedCount;
            const priceAddition=  INGREDIENTS_PRICES[type];
            const oldPrice=this.state.totalPrice;
            const newPrice=oldPrice+ priceAddition;
            this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
           // this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount<=0)
        {return ;
        }
        const updatedCount=oldCount-1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceDeduction=  INGREDIENTS_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
       //  this.updatePurchaseState(updatedIngredients);

    }
    
    render(){
        const disableInfo={...this.state.ingredients};
        for(let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} disabled={disableInfo}
                 purchasable ={this.state.purchasable} price={this.state.totalPrice} ordered={this.purchaseHandler}/>
                
            </Aux>
        );
    }
}

export default BurgerBuilder;