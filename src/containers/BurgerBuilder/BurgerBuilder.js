import React,{ Component } from "react";
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';


const INGREDIENTS_PRICES={
    salad:1,
    cheese:5,
    bacon:2,
    meat:6
}
class BurgerBuilder extends Component{
        state={
            ingredients:
                null,
            totalPrice:0,
            purchasable:false,
            purchasing:false,
            loading:false,
            error:false
        }

  componentDidMount(){
      axios.get('https://react-my-burger-f40af.firebaseio.com/ingredients.json')
      .then(response=>{
            this.setState({
                ingredients:response.data
            })
      })
      .catch(error=>{
        this.setState({error:true});
    });

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
            //this.updatePurchaseState(updatedIngredients);

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
        //this.updatePurchaseState(updatedIngredients);

    }


    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{
        this.setState({loading:true});
        const order={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'Shefali Goyal',
                address:{
                    street:'DummyDataStreet',
                    zipcode:'110078',
                    country:'India'
                },
                email:'dummy@dummy.com'
            },
            deliveryMethod:'fastest'
        }
       axios.post('/orders.json',order)
       .then(response=>{
           this.setState({loading:false,purchasing:false});
       })
       .catch(error=>{
           this.setState({loading:false,purchasing:false});
       });
    }
    

    
    render(){
        const disableInfo={...this.state.ingredients};
        for(let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0
        }
        let orderSummary=null;
        let burger=this.state.error?<p>Ingredients can't be loaded!</p>:<Spinner/>;
        if(this.state.ingredients){
         burger= (
        <Aux>
            <Burger ingredients={this.state.ingredients} />
        <BuildControls ingredientAdded={this.addIngredientHandler} ingredientRemoved={this.removeIngredientHandler} disabled={disableInfo}
         purchasable ={this.state.purchasable} price={this.state.totalPrice} ordered={this.purchaseHandler}/>
         </Aux>);
         orderSummary= <OrderSummary ingredients={this.state.ingredients} price={this.state.totalPrice}
         purchaseCancelled={this.purchaseCancelHandler}
         purchaseContinue={this.purchaseContinueHandler}/>
        }
        if(this.state.loading){
            orderSummary=<Spinner/>;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
               
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);