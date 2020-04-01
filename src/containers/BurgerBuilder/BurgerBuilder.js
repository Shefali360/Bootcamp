import React,{ Component } from "react";
import {connect} from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actionTypes from '../../store/actions/actions';

const INGREDIENTS_PRICES={
    salad:1,
    cheese:5,
    bacon:2,
    meat:6
}
class BurgerBuilder extends Component{
        state={
            purchasing:false,
            loading:false,
            error:false
        }

  componentDidMount(){
      console.log(this.props);
    //   axios.get('https://react-my-burger-f40af.firebaseio.com/ingredients.json')
    //   .then(response=>{
    //         this.setState({
    //             ingredients:response.data
    //         })
    //   })
    //   .catch(error=>{
    //     this.setState({error:true});
    // });

  }
     updatePurchaseState(ingredients){
        const sum=Object.keys(ingredients).map(item=>{
          return ingredients[item];
          }).reduce((sum,el)=>{
               return sum+el;
            },0);
     return sum>0;
        }


    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{
    //     this.setState({loading:true});
    //     const order={
    //         ingredients:this.state.ingredients,
    //         price:this.state.totalPrice,
    //         customer:{
    //             name:'Shefali Goyal',
    //             address:{
    //                 street:'DummyDataStreet',
    //                 zipcode:'110078',
    //                 country:'India'
    //             },
    //             email:'dummy@dummy.com'
    //         },
    //         deliveryMethod:'fastest'
    //     }
    //    axios.post('/orders.json',order)
    //    .then(response=>{
    //        this.setState({loading:false,purchasing:false});
    //    })
    //    .catch(error=>{
    //        this.setState({loading:false,purchasing:false});
    //    });
    this.props.history.push('/checkout');
    }
    

    
    render(){
        const disableInfo={...this.props.ings};
        for(let key in disableInfo){
            disableInfo[key]=disableInfo[key]<=0
        }
        let orderSummary=null;
        let burger=this.state.error?<p>Ingredients can't be loaded!</p>:<Spinner/>;
        if(this.props.ings){
         burger= (
        <Aux>
            <Burger ingredients={this.props.ings} />
        <BuildControls ingredientAdded={this.props.onIngredientAdded} ingredientRemoved={this.props.onIngredientRemoved} disabled={disableInfo}
         purchasable ={this.updatePurchaseState(this.props.ings)} price={this.props.price} ordered={this.purchaseHandler}/>
         </Aux>);
         orderSummary= <OrderSummary ingredients={this.props.ings} price={this.props.price}
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

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));