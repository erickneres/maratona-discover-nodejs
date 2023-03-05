export interface TransactionProps {
  id: string,
  description: string,
  amount: number,
  date: Date,
}

class Transaction {
  private props: TransactionProps;

  constructor (props: TransactionProps) {
    const { id, description, amount, date } = props;

    const today = new Date();

    if (date < today) {
      throw new Error("Invalid start date");
    }

    if (!description.trim().length) {
      throw new Error("Invalid description");
    }

    if (amount === 0) {
      throw new Error("Invalid amout");
    }

    this.props = props;
  }

  get allProps() {
    return this.props;
  }

  get id() {
    return this.props.id;
  }

  get description() {
    return this.props.description;
  }

  get amount() {
    return this.props.amount;
  }

  get date() {
    return this.props.date;
  }
}

export default Transaction;