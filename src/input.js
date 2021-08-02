const toType = (t1, obj) => {
  return {
    ...obj
  , equals: (t2) => t1 === t2
  , name: t1.name
  }
}

export const Model = {
  main: (deviceId, pos, coordinates) =>
    toType(Model.main, {deviceId, pos, coordinates})
}

export const Msg = {
  onTapImg: (ev) => toType(Msg.onTapImg, {ev}),
  onInputDeviceId: (deviceId) => toType(Msg.onInputDeviceId, {deviceId}),
  add: () => toType(Msg.add, {}),
  cancel: () => toType(Msg.cancel, {})
}

const model2Coordinate = ({deviceId, pos}) => {
  return {...pos, deviceId};
}

export const update = (msg, model) => {
  if (msg.equals(Msg.onTapImg)) {
    const {ev: {x, y}} = msg;
    return {...model, pos: {x, y}};
  } else if (msg.equals(Msg.onInputDeviceId)) {
    const {deviceId} = msg;
    return {...model, deviceId};
  } else if (msg.equals(Msg.add)) {
    const {coordinates} = model;
    const newCoordinate = model2Coordinate(model);
    return { ...model, pos: null
      , coordinates: coordinates.concat([newCoordinate])
      };
  } else if (msg.equals(Msg.cancel)) {
    return {...model, pos: null};
  }
}
