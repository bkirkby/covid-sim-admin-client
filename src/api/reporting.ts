interface GraphPartialData {
  healthy_array: number[],
  immune_array: number[],
  infected_array: number[],
}

class BaseCovidReport {
  static INTERVAL_MS = 60;
  title: string = '';
  date: Date | null = null;
  data: GraphPartialData;

  constructor(title: string, data: GraphPartialData, date: Date = new Date()) {
    if (this.constructor === BaseCovidReport) {
      throw new TypeError('Abstract class "BaseCovidReport" cannot be instantiated. Try extending it with another class.');
    }
    this.title = title;
    this.data = data;
    this.date = date;
  };

  get formattedData(): object {
    throw new TypeError('Classes that extend "BaseCovidReport" must implement getter "formattedData".');
  }

};

export class CovidMillisecondReport extends BaseCovidReport {
  get formattedData(): object {
    const _formattedReportData = [];
    for (let i = 0; i < this.data.healthy_array.length; i++) {
      _formattedReportData.push({
        time: (i + 1) * BaseCovidReport.INTERVAL_MS,
        numHealthy: this.data.healthy_array[i],
        numInfected: this.data.infected_array[i],
        numImmune: this.data.immune_array[i]
      })
    }
    return _formattedReportData;
  }
}

export class CovidSecondReport extends BaseCovidReport {
  get formattedData(): object {
    const _formattedReportData = [];
    for (let i = 0; i < this.data.healthy_array.length; i++) {
      _formattedReportData.push({
        time: (((i + 1) * BaseCovidReport.INTERVAL_MS) / 1000).toFixed(2),
        numHealthy: this.data.healthy_array[i],
        numInfected: this.data.infected_array[i],
        numImmune: this.data.immune_array[i]
      })
    }
    return _formattedReportData;
  }
};