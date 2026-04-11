import api from "@/lib/api";
import { CustomerCreate } from "@/types/customer";

export const CustomerService = {
  async getCustomers(pageNumber: number = 1, perPage: number = 5) {
    try {
      const res = await api.get("/customers", {
        params: {
          page: pageNumber,
          per_page: perPage,
        },
      });
      return res;
    } catch (error) {
      throw error;
    }
  },

  async createCustomer(data: CustomerCreate) {
    try {
      const res = await api.post(`/customers/`, data);
      return res;
    } catch (error) {
      throw error;
    }
  },

  async findCustomerById(id: string) {
    try {
      const res = await api.get(`/customers/${id}`);
      return res;
    } catch (error) {
      throw error;
    }
  },

  async updateCustomer(id: string, data: CustomerCreate) {
    try {
      const res = await api.put(`/customers/${id}`, data);
      return res;
    } catch (error) {
      throw error;
    }
  },

  async deleteCustomer(id: string) {
    try {
      const res = await api.delete(`/customers/${id}`);
      return res;
    } catch (error) {
      throw error;
    }
  },
};
