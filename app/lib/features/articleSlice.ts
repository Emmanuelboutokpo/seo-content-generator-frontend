import { createSlice, createAsyncThunk, PayloadAction, isRejectedWithValue } from '@reduxjs/toolkit';
import api from '@/app/utils/api';

interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface Article {
  id: string;
  topic: string;
  content: string;
  created_at: string;
  updated_at: string;
}

interface ArticleState {
  articles: Article[];
  activeArticle: Article | null;
  isLoading: boolean;
  isFetchingMore: boolean; // Nouvel état pour le chargement supplémentaire
  error: string | null;
  pagination: {
    count: number;
    next: string | null;
    previous: string | null;
  };
}

const initialState: ArticleState = {
  articles: [],
  activeArticle: null,
  isLoading: false,
  isFetchingMore: false, // Initialisation
  error: null,
  pagination: {
    count: 0,
    next: null,
    previous: null
  }
};

const toApiError = (error: unknown): string => {
  if (error instanceof Error) {
    const axiosError = error as any;
    return axiosError.response?.data?.detail || error.message;
  }
  return 'Erreur inconnue';
};

// Thunk pour le chargement initial
export const fetchInitialArticles = createAsyncThunk(
  'articles/fetchInitial',
  async (_, thunkAPI) => {
    try {
      const response = await api.get<PaginatedResponse<Article>>('/articles/', {
        params: { limit: 10, offset: 0 }
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiError(error));
    }
  }
);

// Thunk pour charger plus d'articles
export const fetchMoreArticles = createAsyncThunk(
  'articles/fetchMore',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as { articles: ArticleState };
    const nextUrl = state.articles.pagination.next;
    
    if (!nextUrl) {
      return thunkAPI.rejectWithValue('No more articles to load');
    }

    try {
      const response = await api.get<PaginatedResponse<Article>>(nextUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiError(error));
    }
  }
);
export const fetchArticle = createAsyncThunk('articles/fetchOne', async (id: string, thunkAPI) => {
  try {
    const { data } = await api.get<Article>(`/articles/${id}/`);
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(toApiError(error));
  }
});

// export const createArticle = createAsyncThunk('articles/create', async (topic: string, thunkAPI) => {
//   try {
//     const response =  await api.post<Article>('/articles/', { topic });
//     return response;
//   } catch (error) {
//     return thunkAPI.rejectWithValue(toApiError(error));
//   }
// });
// export const createArticle = createAsyncThunk(
//   'articles/create',
//   async (topic: string, thunkAPI) => {
//     try {
//       const response = await api.post('/articles/', { topic });
//       // Extraire uniquement les données nécessaires
//       const { data } = response;
//       return {
//         id: data.id,
//         topic: data.topic,
//         content: data.content,
//         created_at: data.created_at,
//         updated_at :data.updated_at
//       };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(toApiError(error));
//     }
//   }
// );

// export const createArticle = createAsyncThunk(
//   'articles/create',
//   async (topic: string, thunkAPI) => {
//     try {
//       const response = await api.post('/articles/', { topic });
      
//       // Vérifiez la structure de réponse
//       console.log('Réponse complète:', response); 
      
//       // Retournez explicitement les données nécessaires
//       return {
//         id: response.data.id,
//         topic: response.data.topic,
//         content: response.data.content,
//         created_at: response.data.created_at || new Date().toISOString(),
//         updated_at : response.data.created_at || new Date().toISOString(),
//       };
//     } catch (error) {
//       return thunkAPI.rejectWithValue(toApiError(error));
//     }
//   }
// )

export const createArticle = createAsyncThunk(
  'articles/create',
  async (topic: string, thunkAPI) => {
    try {
      const response = await api.post('/articles/', { topic });
      
      // Extraction EXPLICITE des données
      const { id, topic: responseTopic, content, created_at, updated_at } = response.data;
      
      if (!id) {
        throw new Error('ID manquant dans la réponse');
      }

      return {
        id,
        topic: responseTopic || topic, // Fallback au topic original si nécessaire
        content: content || '',
        created_at: created_at || new Date().toISOString(),
        updated_at: updated_at || new Date().toISOString()
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiError(error));
    }
  }
);

export const updateArticle = createAsyncThunk(
  'articles/update',
  async ({ id, updates }: { id: string; updates: Partial<Article> }, thunkAPI) => {
    try {
      const { data } = await api.patch<Article>(`/articles/${id}/`, updates);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(toApiError(error));
    }
  }
);

export const deleteArticle = createAsyncThunk('articles/delete', async (id: string, thunkAPI) => {
  try {
    await api.delete(`/articles/${id}/`);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(toApiError(error));
  }
});

const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setActiveArticle: (state, action: PayloadAction<string | null>) => {
      if (!action.payload) {
        state.activeArticle = null;
        return;
      }
      const found = state.articles.find(article => article.id === action.payload);
      if (found) {
        state.activeArticle = found;
      }
    },
    resetArticles: (state) => {
      // Réinitialiser pour un nouveau chargement
      state.articles = [];
      state.pagination = initialState.pagination;
    }
  },
  extraReducers: builder => {
    builder
      // Chargement initial
      .addCase(fetchInitialArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInitialArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload.results;
        state.pagination = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous
        };
      })
      
      // Chargement supplémentaire
      .addCase(fetchMoreArticles.pending, (state) => {
        state.isFetchingMore = true;
      })
      .addCase(fetchMoreArticles.fulfilled, (state, action) => {
        state.isFetchingMore = false;
        state.articles = [...state.articles, ...action.payload.results];
        state.pagination = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous
        };
      })
      .addCase(fetchMoreArticles.rejected, (state, action) => {
        state.isFetchingMore = false;
        state.error = action.payload as string;
      })
      
      // .addCase(createArticle.fulfilled, (state, action) => {
      //   if (action.payload?.id) {
      //     state.articles.unshift(action.payload); // Ajoute au début
      //     state.activeArticle = action.payload;
      //     state.error = null;
      //   } else {
      //     state.error = 'Article créé mais données incomplètes';
      //   }
      // })

      .addCase(createArticle.fulfilled, (state, action) => {
        if (action.payload?.id) {
          state.articles.unshift(action.payload); // Ajoute au début du tableau
          state.activeArticle = action.payload;
          state.error = null;
        } else {
          state.error = 'Article créé mais données incomplètes';
        }
      })
      
      .addCase(updateArticle.fulfilled, (state, action) => {
        state.articles = state.articles.map(a => a.id === action.payload.id ? action.payload : a);
        if (state.activeArticle?.id === action.payload.id) {
          state.activeArticle = action.payload;
        }
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter(a => a.id !== action.payload);
        if (state.activeArticle?.id === action.payload) {
          state.activeArticle = null;
        }
        state.error = null;
      })
      .addMatcher(action => action.type.startsWith('articles/') && action.type.endsWith('/pending'), state => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(isRejectedWithValue, (state, action) => { state.isLoading = false; state.error = action.payload as string; })
      .addMatcher(action => action.type.startsWith('articles/') && action.type.endsWith('/fulfilled'), state => {
        state.isLoading = false;
      });
  }
});

export const { setActiveArticle } = articleSlice.actions;
export default articleSlice.reducer;
