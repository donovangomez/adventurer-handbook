import React, { useState, useEffect } from "react";
import TodoForm from "../components/TodoForm";
import Todo from "../components/Todo";
import TodoContainer from "../components/TodoContainer";
import Layout from "../components/Layout";
import { Flex, Text, Box } from "@chakra-ui/react";
import { supabase } from "../utils/supabase";
import { format, compareAsc } from "date-fns";
import CharacterImage from "../components/CharacterImage";

export default function TodoList({ characters, weapons }) {
  const [todos, setTodos] = useState([
    { text: "Do my daily commissions", completed: false, id: 1 },
  ]);
  const [inputText, setInputText] = useState("");
  let today = format(new Date(), "EEEE");
  console.log(characters);
  return (
    <Layout>
      <Flex
        flex="1"
        minH="100vh"
        color="black"
        justifyContent="center"
        alignItems="center"
        flexDir={["column", "column", "column", "column", "row"]}
        backgroundColor="gray.100"
        gap="10"
      >
        <Flex
          flexDir="column"
          p="4"
          backgroundColor="white"
          minH="22rem"
          minW="30rem"
        >
          <TodoForm
            todos={todos}
            setTodos={setTodos}
            inputText={inputText}
            setInputText={setInputText}
          />
          <TodoContainer todos={todos} setTodos={setTodos} inputText={inputText} />
        </Flex>
        <Box
          w={["100%", "90%", "600px", "600px"]}
          minH="300px"
          boxShadow="2xl"
          rounded="lg"
          padding="2"
          backgroundColor="white"
        >
          <Text
           bgGradient="linear(to-l, #6B46C1, #CF3DA9)"
           bgClip="text"
           fontSize="3xl"
           fontWeight="extrabold"
          >
            Farmable today
          </Text>
          <Flex flexWrap="wrap">
            {characters.map((character) => (
              <div key={character.id}>
                {/* map over array that includes todays date */}
                {character.farmable_days.includes(today) ? (
                  <Flex flexDir="column">
                    <CharacterImage
                      icon={character.icon}
                      name={character.name}
                    />
                  </Flex>
                ) : (
                  ""
                )}
              </div>
            ))}
          </Flex>
          <Flex flexWrap="wrap">
            {weapons.map((weapon) => (
              <div key={weapon.id}>
                {/* map over array that includes todays date */}
                {weapon.farmable_days.includes(today) ? (
                  <Flex flexDir="column">
                    <CharacterImage icon={weapon.image} name={weapon.name} />
                  </Flex>
                ) : (
                  ""
                )}
              </div>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data: characters } = await supabase.from("characters").select("*");
  const { data: weapons } = await supabase.from("weapons").select("*");

  return {
    props: {
      characters,
      weapons,
    },
  };
};
