import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData,
         doc, getDocs, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Paciente } from '../models/paciente.model';
import { get } from 'http';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {
  private pacientesCollection;

  constructor(private firestore: Firestore) {
    this.pacientesCollection = collection(this.firestore, 'pacientes');
  }

  getPacientes(): Observable<Paciente[]> {
    const q = collection(this.firestore, 'pacientes');
    return from(getDocs(q)).pipe(
      map(snapshot => snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Paciente)))
    ); 
  }

  addPaciente(paciente: Paciente): Promise<any> {
    return addDoc(this.pacientesCollection, paciente);
  }

  updatePaciente(id: string, paciente: Partial<Paciente>): Promise<void> {
    const pacienteDoc = doc(this.firestore, `pacientes/${id}`);
    return updateDoc(pacienteDoc, paciente);
  }

  deletePaciente(id: string): Promise<void> {
    const pacienteDoc = doc(this.firestore, `pacientes/${id}`);
    return deleteDoc(pacienteDoc);
  }
}