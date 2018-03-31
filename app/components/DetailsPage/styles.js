export default {
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#000',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '85%',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  userImage: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  buttonWrapper: {
    alignSelf: 'center',
    marginLeft: 'auto',
  },
  icon: {
    color: '#5cb85c',
  },
  outerInfoWrapper: {
    height: 60,
  },
  infoWrapper: isOpen => ({
    paddingTop: isOpen ? 10 : undefined,
    backgroundColor: 'rgba(47, 79, 79, 0.6)',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: isOpen ? undefined : '100%',
  }),
  infoText: {
    color: '#fff',
    fontSize: 12,
  },
  infoHeader: isOpen => ({
    height: isOpen ? undefined : '100%',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingBottom: isOpen ? 10 : undefined,
  }),
  infoHeaderText: {
    color: 'white',
  },
  infoList: {
    padding: 10,
    paddingLeft: 20,
    paddingTop: 0,
  },
};

