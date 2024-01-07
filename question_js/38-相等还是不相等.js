const expact = (val) => {
  return {
    toBe:function(expact){
      if(val!==expact){
        throw new Error('Not Equal!');
      }
      return true;
    },
    NotToBe:function(expact){
      if(val === expact){
        throw new Error("Equal!");
      }
      return true;
    }
  }
}