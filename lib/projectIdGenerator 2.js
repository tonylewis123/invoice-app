module.exports = (name, lastProject) => {
  let projectId = '';

  if(name !== undefined && !lastProject){
    return projectId = `${name}001`;
  }

  if(name !== undefined){
    let data = lastProject.projectId.split('');
    let count = '';

    for (let i = 3; i < data.length; i++) {
      if(data[i] == 0) continue;
      count = data.slice(i, data.length).join('');
      break;
    }

    switch (count.length) {
      case 1: projectId = `${name}00${parseInt(count) + 1}`;
        break;
      case 2: projectId = `${name}0${parseInt(count) + 1}`;
        break;
      default: projectId = `${name}${parseInt(count) + 1}`;;
    }
  }
  return projectId;
};
