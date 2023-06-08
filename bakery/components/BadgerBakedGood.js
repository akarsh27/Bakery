// import BakeryOrderContext from "../contexts/BakeryOrderContext";
// import React, { useState, useEffect } from 'react';
// import { View, Text, Image, Button } from 'react-native';

// export default function BadgerBakedGood(props) {
//     const [Count, setCount] = useContext(BakeryOrderContext)

//     return <View>
//         <Text>I am a baked good!</Text>
//     </View>
// }
// BadgerBakedGoods.js
import React, { useContext, useState } from "react";
import { View, Text, Image, Button } from "react-native";
import BakeryOrderContext from "../contexts/BakeryOrderContext";

const BadgerBakedGood = ({
  name,
  img,
  price,
  quantity,
  index,
  currentIndex,
  handleRemove,
  handleAdd,
  basket,
}) => {
  return (
    index === currentIndex && (
      <View>
        <Image
          source={{ uri: img }}
          style={{ width: 100, height: 100, marginRight: 10 }}
        />
        <View>
          <Text style={{ fontWeight: "bold" }}>{name}</Text>
          <Text>${price.toFixed(2)}</Text>
          <Text>You can Order up to {quantity} units!</Text>
          <View>
            <Button
              title="-"
              onPress={handleRemove}
              disabled={basket && basket[name] === 0}
            />
            <Text>{basket && basket[name]}</Text>
            <Button
              title="+"
              onPress={handleAdd}
              disabled={basket && basket[name] === quantity}
            />
          </View>
        </View>
      </View>
    )
  );
};

export default BadgerBakedGood;
