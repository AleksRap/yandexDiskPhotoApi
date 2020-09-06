import Events from "../../core/Events/Events";
import "./Tools.scss";
import dom from "../../core/Dom/Dom";

interface DataValue {
  name: string,
  value: string
}

export default class Tools extends Events {
  readonly parent: any;
  public btnSortName: any;
  public btnSortSize: any;

  constructor(parent) {
    super();
    this.parent = parent;

    this.init();
  }

  init() {
    const tools = dom().create('div', ['Tools']);
    this.btnSortName = this.createBtn('Сортировка по имени', {name: 'sort', value: 'name'});
    this.btnSortSize = this.createBtn('Сортировка по размеру', {name: 'sort', value: 'size'});
    tools.append(this.btnSortName, this.btnSortSize);

    this.parent.append(tools);

    return tools;
  }

  private createBtn(name: string, data?: DataValue) {
    const btn = dom().create('button', ['Button']);
    btn.textContent = name;
    if (data) {
      btn.dataset[data.name] = data.value;
    }

    return btn;
  }
}
