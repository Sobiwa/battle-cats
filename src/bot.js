/* eslint-disable no-plusplus */

function determineOrientation(array) {
  return array[0][0] === array[1][0] ? "y" : "x";
}

function assessAdjacentCoordinates(start, boardID, cat, axis, direction) {
  let allDir;
  const [x, y] = start;
  const up = () => assessAdjacentCoordinates([x, y - 1], boardID, cat, "y", -1);
  const right = () =>
    assessAdjacentCoordinates([x + 1, y], boardID, cat, "x", 1);
  const down = () =>
    assessAdjacentCoordinates([x, y + 1], boardID, cat, "y", 1);
  const left = () =>
    assessAdjacentCoordinates([x - 1, y], boardID, cat, "x", -1);

  if (start.some((num) => num > 9 || num < 0)) return null;

  const oppBoardCell = boardID.board[`[${start}]`];
  if (
    oppBoardCell.attacked &&
    (!oppBoardCell.occupiedBy || oppBoardCell.occupiedBy !== cat)
  ) {
    return null;
  }
  if (!oppBoardCell.attacked) return start;

  if (axis) {
    if (axis === "x") {
      if (direction) {
        return assessAdjacentCoordinates(
          [x + 1 * direction, y],
          boardID,
          cat,
          axis,
          direction
        );
      }
      allDir = [left(), right()];
    } else if (axis === "y") {
      if (direction) {
        return assessAdjacentCoordinates(
          [x, y + 1 * direction],
          boardID,
          cat,
          axis,
          direction
        );
      }
      allDir = [up(), down()];
    }
  } else {
    allDir = [up(), right(), down(), left()];
  }
  return allDir.filter((opt) => opt !== null);
}

function addPoints(oppBoard, coord, direction, max, points = -1) {
  const cell = oppBoard.board[`[${coord}]`];
  if (
    points === max - 1 ||
    coord.some((num) => num > 9 || num < 0) ||
    cell.attacked
  )
    return points;
  const [x, y] = coord;
  let newCoord;
  switch (direction) {
    case "up":
      newCoord = [x, y + 1];
      break;
    case "right":
      newCoord = [x + 1, y];
      break;
    case "down":
      newCoord = [x, y - 1];
      break;
    case "left":
      newCoord = [x - 1, y];
      break;
    default:
      break;
  }
  return addPoints(oppBoard, newCoord, direction, max, points + 1);
}

function gradeSpot(opponentBoard, coord) {
  const lengthOfLongestCatRemaining = opponentBoard.cats.reduce(
    (a, b) => (!b.isSunk() && b.length > a ? b.length : a),
    0
  );
  return (
    addPoints(opponentBoard, coord, "up", lengthOfLongestCatRemaining) +
    addPoints(opponentBoard, coord, "right", lengthOfLongestCatRemaining) +
    addPoints(opponentBoard, coord, "down", lengthOfLongestCatRemaining) +
    addPoints(opponentBoard, coord, "left", lengthOfLongestCatRemaining)
  );
};

function compFireShot(opponentBoard) {
  const woundedTargets = [];
  let possibleHits;
  opponentBoard.cats.forEach((cat) => {
    if (cat.hits > 0 && !cat.isSunk()) {
      woundedTargets.push(cat);
    }
  });
  if (woundedTargets.length) {
    const primaryTarget = woundedTargets[0];
    if (primaryTarget.coordHit.length > 1) {
      const orientation = determineOrientation(primaryTarget.coordHit);
      possibleHits = assessAdjacentCoordinates(
        primaryTarget.coordHit[0],
        opponentBoard,
        primaryTarget,
        orientation
      );
    } else {
      possibleHits = assessAdjacentCoordinates(
        primaryTarget.coordHit[0],
        opponentBoard,
        primaryTarget
      );
    }
  } else {
     const allPossibleHits = [];
    Object.keys(opponentBoard.board).forEach((cell) => {
      if (!opponentBoard.board[cell].attacked) {
        allPossibleHits.push(opponentBoard.board[cell].coordinates);
      }
    });
    let topScore = 0;
    possibleHits = allPossibleHits.reduce((a, b) => {
      const spotGrade = gradeSpot(opponentBoard, b);
      console.log(spotGrade, topScore);
      if (spotGrade > topScore) {
        topScore = spotGrade;
        return [b];
      }
      if (spotGrade === topScore) {
        a.push(b);
      }
      return a
    }, []);
    console.log(possibleHits);
  }
  return possibleHits[Math.floor(possibleHits.length * Math.random())];
}

export { assessAdjacentCoordinates, compFireShot };
