import React, { useState, useEffect, useMemo } from "react";
import { View, Text, Button, ALert } from "react-native";
import BadgerBakedGood from "./BadgerBakedGood";
import BakeryOrderContext from "../contexts/BakeryOrderContext";

const API_URL = "https://www.cs571.org/s23/hw8/api/bakery/items";

const BadgerBakedGood1 = ({
  name,
  img,
  price,
  quantity,
  index,
  currentIndex,
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
        </View>
      </View>
    )
  );
};

const BadgerBakery = () => {
  const [bakedGoods, setBakedGoods] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const [basket, setBasket] = useState({});
  const [totalPrice, setTotalPrice] = useState(0.0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL, {
          headers: { "X-CS571-ID": "bid_6e852f5dac55e4daa62b" },
        });
        const data = await response.json();
        setBakedGoods(data);
        setMaxIndex(Object.keys(data).length - 1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSubmitOrderClicked = () => {
    console.log("am i here?");
    if (Object.keys(basket).length == 0) {
      alert("You must add atleast one item");
      return;
    }

    fetch(`https://www.cs571.org/s23/hw8/api/bakery/order`, {
      method: "POST",
      headers: {
        "X-CS571-ID": "bid_6e852f5dac55e4daa62b",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        basket,
      }),
      // credentials: "include",
    })
      .then((res) => {
        console.log(" what is the response");
        alert("Successfully placed order");
        if (res.status === 200) {
          console.log(" what is the response");
          alert("Successfully placed order");
        }
      })
      .catch((error) => {
        alert("Something went wrong");
        console.log(" what is the error", error);
        console.log(error);
      })
      .finally(() => {
        console.log("here??");
      });
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleAdd = (key, price) => {
    let quantity = 0;
    if (basket[key]) {
      quantity = basket[key];
    }
    setBasket({
      ...basket,
      [key]: quantity + 1,
    });
    setTotalPrice(totalPrice + price);
  };

  const handleRemove = (key, price) => {
    setBasket({ ...basket, [key]: Math.max(basket[key] - 1, 0) });
    setTotalPrice(totalPrice - price);
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={{ fontSize: 25 }}>Welcome to Badger Bakery!</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button
          title="Previous"
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        />
        <Button
          title="Next"
          onPress={handleNext}
          disabled={currentIndex === maxIndex}
        />
      </View>
      {bakedGoods &&
        Object.keys(bakedGoods).map((key, index) => (
          <BadgerBakedGood
            key={key}
            name={key}
            img={bakedGoods[key].img}
            price={bakedGoods[key].price}
            quantity={bakedGoods[key].upperBound}
            index={index}
            currentIndex={currentIndex}
            handleAdd={() => handleAdd(key, bakedGoods[key].price)}
            handleRemove={() => handleRemove(key, bakedGoods[key].price)}
            basket={basket}
          />
        ))}
      <Text>Order total: ${totalPrice}</Text>
      <Button
        title="Next"
        onPress={handleNext}
        disabled={currentIndex === maxIndex}
      />
      <Button title="Place order" onPress={handleSubmitOrderClicked} />
    </View>
  );
};

export default BadgerBakery;
