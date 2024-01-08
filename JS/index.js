let cartAllProduct =[]
function addToCart(target){
    const getImage = target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].currentSrc;
    const getTitle = target.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].innerHTML;
    // const product = ({getTitle,getImage});


    const li = document.createElement('li');
    li.innerText = getTitle
    

    const cartbox= document.getElementById('cartProducts')
    cartbox.appendChild(li);

    
}