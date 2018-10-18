import { FlattenPipe } from './flatten.pipe';

describe('FlattenPipe', () => {
  let pipe:FlattenPipe = null;
  beforeAll(()=>{
    pipe = new FlattenPipe()
  });

  it('Should transform a single property object', () => {
    let value = {name:'John'};
    let transformedValue = pipe.transform(value);
    expect(transformedValue).toBe('John');
  });

  it('Should transform a multiple property object', () => {
    let value = {name:'John',lastName:'Smith', gender: 'Male'};
    let transformedValue = pipe.transform(value);
    expect(transformedValue).toBe('John - Smith - Male');
  });

  it('Should skip a property, if required, to be transformed', () => {
    let value = {name:'John',lastName:'Smith', id: '213801234124124'};
    let transformedValue = pipe.transform(value, ['id']);
    expect(transformedValue).toBe('John - Smith');
  });

  it('Should skip multiple properties, if required, to be transformed', () => {
    let value = {name:'John',lastName:'Smith', id: '213801234124124', anotherUglyProperty: 'test'};
    let transformedValue = pipe.transform(value, ['id', 'anotherUglyProperty']);
    expect(transformedValue).toBe('John - Smith');
  });

  it('Expect a different separator', () => {
    let value = {name:'John',lastName:'Smith', gender: 'Male'};
    let separator = ' , ';
    let transformedValue = pipe.transform(value,[],separator);
    expect(transformedValue).toBe('John , Smith , Male');
  });

  it('Test all together', () => {
    let value = {name:'John',lastName:'Smith', gender: 'Male', id: '213801234124124'};
    let separator = ' | ';
    let transformedValue = pipe.transform(value,['gender','id'],separator);
    expect(transformedValue).toBe('John | Smith');
  });

  afterAll(()=>{
    /* Freeing memory */
    pipe = null;
  });
});
