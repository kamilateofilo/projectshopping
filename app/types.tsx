export type RootStackParamList = {
    Auth: undefined; // ou algum parâmetro se necessário
    Home: undefined; // ou parâmetros se necessário
    LoginModal: undefined;
    AllScreen: undefined;
    Cart: undefined;
    ProductDetail: { title: string; description: string; price: number; image: string };
  };