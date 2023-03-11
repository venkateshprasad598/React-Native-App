import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function App() {
  const [textInputVal, setTextInputVal] = useState("");
  const [goalsList, setGoalsList] = useState([]);

  const handleInputChange = (e) => {
    setTextInputVal(e);
  };
  const addGoal = () => {
    if (textInputVal.trim()) {
      setGoalsList((currentGoalsList) => [
        ...currentGoalsList,
        { text: textInputVal, id: new Date().getTime() },
      ]);
      setTextInputVal("");
    }
  };

  const makeEmpty = () => {
    setGoalsList([]);
  };

  const removeGoal = (id) => {
    const updatedGoals = goalsList?.filter((item) => item.id !== id);
    setGoalsList(updatedGoals);
  };
  return (
    <View style={styles.container}>
      <View style={styles.addGoalContainer}>
        <TextInput
          style={styles.inputText}
          placeholder="Add a Goal"
          onChangeText={handleInputChange}
          value={textInputVal}
        />
        <Button title="Add Goal" onPress={addGoal} />
      </View>
      <Button title="clear" onPress={makeEmpty} />
      <View style={styles.goalsList}>
        <FlatList
          data={goalsList}
          renderItem={({ item }) => (
            // if item has key then we don not need to add key explicitly
            // if it does not have key or the unique id is having other key name ex : id, then use keyExtractor={item => item.id}
            <View style={styles.goalView}>
              <Pressable
                onPress={() => removeGoal(item.id)}
                android_ripple={{ color: "grey" }}
                style={({ pressed }) => pressed && styles.removeGoalEffect}
              >
                <Text style={styles.goalItem}>{item.text}</Text>
              </Pressable>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 10,
    backgroundColor: "white",
    // width: "100%",
  },
  addGoalContainer: {
    flexDirection: "row",
    // width: "100%",
    paddingBottom: 20,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    alignItems: "center",
  },
  inputText: {
    flex: 1,
    borderColor: "purple",
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
    // width: "50%",
  },
  text: {
    color: "black",
    padding: 10,
    borderWidth: 2,
    borderColor: "red",
  },
  goalsList: {
    flex: 1,
    marginTop: 10,
  },
  goalView: {
    backgroundColor: "purple",
    borderRadius: 10,
    marginBottom: 8,
  },
  goalItem: {
    padding: 10,
    color: "white",
  },
  removeGoalEffect: {
    hover: "cursor",
    backgroundColor: "white",
    color: "black",
    borderRadius: 10,
  },
});
