import DummyImage from '../helpers/dummyImage.jsx';

/**
 * Factory to generate test node data for TreeSection/Node tests.
 */
export default function testDataFactory({
  name = 'Node',
  description = 'Test node',
  pointCap = 3,
  pointLock = 0,
  unlocks = [],
  image = DummyImage,
} = {}) {
  return {
    name,
    description,
    pointCap,
    pointLock,
    unlocks,
    image,
  };
}

