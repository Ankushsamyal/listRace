
import React, { useState } from 'react'

export default function TryTestingCount() {
    const [count, setCount] = useState(0)
    const problem='akjfkajflkjlksdjfklsjfslkj'
    const finalResult = problem.split('')
    console.log(finalResult,"finalResult");
    const unique =[...new Set(finalResult)];
    console.log(unique,"unique")

  return (
    <div>
        <h1>this is count:{count}</h1>
        <button onClick={()=>setCount(count+1)}>increment</button>
        <button onClick={()=>setCount(count-1)}>decrement</button>
        <button onClick={()=>setCount(0)}>reset</button>
    </div>
  )
}
